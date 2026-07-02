import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";
import { sendPendingEmail, sendAdminEmail } from "@/lib/email";

export async function POST(req: Request) {
  console.log("POST /api/create-payment - Start");
  try {
    const body = await req.json();
    const { planId, clientName, email, whatsapp, region, planType, paymentMethodId, couponCode, locale, bookedDate, bookedTime } = body;

    if (!planId || !clientName || !whatsapp || !region || !paymentMethodId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch Plan
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // 2. Price Logic
    let amountStr = planType === "quarterly" 
      ? (region === "egypt" ? (plan.salePriceQuarterlyEgp || plan.priceQuarterlyEgp) : (plan.salePriceQuarterlyUsd || plan.priceQuarterlyUsd))
      : (region === "egypt" ? (plan.salePriceMonthlyEgp || plan.priceMonthlyEgp) : (plan.salePriceMonthlyUsd || plan.priceMonthlyUsd));
    
    let amount = parseFloat(amountStr || "0");
    let discountAmount = 0;
    let couponId = null;

    // 3. Handle Coupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (coupon && coupon.isActive) {
        let isValid = true;
        
        // Target check
        if (!coupon.appliesToAll && !coupon.planIds.includes(planId)) isValid = false;
        
        // Total limit check
        if (coupon.totalLimit && coupon.usageCount >= coupon.totalLimit) isValid = false;

        if (isValid) {
          discountAmount = coupon.type === 'PERCENTAGE' 
            ? (amount * (coupon.value / 100))
            : coupon.value;
          
          amount = Math.max(0, amount - discountAmount);
          couponId = coupon.id;
        }
      }
    }

    if (amount <= 0 && !couponId) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // 3b. Slot conflict check for booking plans
    if (bookedDate && bookedTime) {
      const conflicting = await prisma.purchase.findFirst({
        where: { planId: plan.id, bookedDate, bookedTime, status: { not: "CANCELLED" } },
      });
      if (conflicting) {
        return NextResponse.json({ error: "This time slot is no longer available. Please choose another." }, { status: 409 });
      }
    }

    // 4. Create Pending Purchase
    const purchase = await prisma.purchase.create({
      data: {
        clientName,
        email,
        whatsapp,
        planId: plan.id,
        amount,
        currency: region === "egypt" ? "EGP" : "USD",
        status: "PENDING",
        region,
        paymentMethod: paymentMethodId === 2 ? "Card" : paymentMethodId === 3 ? "Fawry" : paymentMethodId === 4 ? "Wallet" : paymentMethodId === 6 ? "Apple Pay" : "Other",
        notes: `Plan Type: ${planType || 'monthly'}${couponCode ? ` | Coupon: ${couponCode}` : ''}${bookedDate ? ` | Booked: ${bookedDate} ${bookedTime}` : ''}`,
        couponId,
        discountAmount,
        ...(bookedDate ? { bookedDate } : {}),
        ...(bookedTime ? { bookedTime } : {}),
      },
    });

    // 4. Init Fawaterak
    const names = clientName.trim().split(" ");
    const firstName = names[0] || "Client";
    const lastName = names.slice(1).join(" ") || "User";
    
    // Robust URL helper
    let baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.coachmohamedroshdy.com').replace(/\/$/, "");
    if (!baseUrl.startsWith("http")) baseUrl = `https://${baseUrl}`;

    const currentLocale = locale || 'en';
    const successUrl = `${baseUrl}/payment/success?purchaseId=${purchase.id}`;
    const failUrl = `${baseUrl}/${currentLocale}/plans`;
    const pendingUrl = `${baseUrl}/payment/pending?purchaseId=${purchase.id}`;

    console.log("DEBUG - Fawaterak Redirects:", { successUrl, failUrl, pendingUrl });

    // Fawaterak wallets (method 4) require local Egyptian format 01XXXXXXXXX, not 201XXXXXXXXX
    const rawPhone = whatsapp.replace(/\+/g, "").replace(/\s/g, "");
    const fawaterakPhone = rawPhone.startsWith("20") && rawPhone.length === 12
      ? "0" + rawPhone.slice(2)
      : rawPhone;

    const paymentData = await fawaterakClient.initPayment({
      payment_method_id: paymentMethodId,
      vendor_id: process.env.FAWATERAK_VENDOR_KEY?.includes('.') ? process.env.FAWATERAK_VENDOR_KEY.split('.').pop() : process.env.FAWATERAK_VENDOR_KEY,
      order_id: purchase.id,
      cartTotal: amount,
      currency: region === "egypt" ? "EGP" : "USD",
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: email || "customer@example.com",
        phone: fawaterakPhone,
      },
      cartItems: [
        {
          name: `${plan.nameEn} (${planType === "quarterly" ? "3 Months" : "Monthly"})`,
          price: amount,
          quantity: 1,
        },
      ],
      redirectionUrls: {
        successUrl,
        failUrl,
        pendingUrl
      },
    });

    // 5. Update with Invoice details (API returns snake_case keys)
    let finalPurchaseId = purchase.id;
    try {
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          invoiceId: paymentData.invoice_id.toString(),
          invoiceKey: paymentData.invoice_key,
        },
      });
    } catch (updateErr: any) {
      if (updateErr.code === 'P2002') {
        // Fawaterak returned an invoiceId already linked to a previous attempt.
        // Delete the orphaned purchase and reuse the existing one.
        await prisma.purchase.delete({ where: { id: purchase.id } }).catch(() => {});
        const existing = await prisma.purchase.findUnique({
          where: { invoiceId: paymentData.invoice_id.toString() },
        });
        if (existing) finalPurchaseId = existing.id;
      } else {
        throw updateErr;
      }
    }

    // 6. Increment coupon usage if applied
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } }
      });
    }

    // 7. Send pending email to client + admin notification
    const paymentMethodLabel = paymentMethodId === 2 ? "Card" : paymentMethodId === 3 ? "Fawry" : paymentMethodId === 4 ? "Wallet" : paymentMethodId === 6 ? "Apple Pay" : "Other";
    try {
      await Promise.all([
        email ? sendPendingEmail({ clientName, email, planName: plan.nameEn, amount, currency: region === "egypt" ? "EGP" : "USD" }) : Promise.resolve(),
        sendAdminEmail({ clientName, email: email || "", whatsapp, planName: plan.nameEn, amount, currency: region === "egypt" ? "EGP" : "USD", paymentMethod: paymentMethodLabel, invoiceId: paymentData.invoice_id?.toString() || null, region, notes: `Plan Type: ${planType || 'monthly'}${couponCode ? ` | Coupon: ${couponCode}` : ''}`, discountAmount, couponCode: couponCode || null }),
      ]);
    } catch (emailErr) {
      console.error("Email error (non-fatal):", emailErr);
    }

    // Wallet payments return pendingUrl, card payments return redirectTo; fall back to invoice URL
    const paymentUrl = paymentData.payment_data?.redirectTo
      || paymentData.payment_data?.pendingUrl
      || `https://app.fawaterk.com/invoice/${paymentData.invoice_id}/${paymentData.invoice_key}`;

    return NextResponse.json({
      status: "success",
      url: paymentUrl,
      paymentData: paymentData.payment_data,
      invoiceId: paymentData.invoice_id,
      purchaseId: finalPurchaseId
    });

  } catch (error: any) {
    console.error("DEBUG - Create Payment Failure:", error);
    return NextResponse.json({ 
      error: error.message || "Internal server error",
      details: error.response?.data || error.stack || "No extra details",
      step: "API Execution"
    }, { status: 500 });
  }
}
