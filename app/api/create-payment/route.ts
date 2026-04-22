import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";
import { sendPendingEmail, sendAdminEmail } from "@/lib/email";

export async function POST(req: Request) {
  console.log("POST /api/create-payment - Start");
  try {
    const body = await req.json();
    const { planId, clientName, email, whatsapp, region, planType, paymentMethodId, couponCode, locale } = body;

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
        paymentMethod: paymentMethodId === 2 ? "Card" : paymentMethodId === 3 ? "Fawry" : "Other",
        notes: `Plan Type: ${planType || 'monthly'}${couponCode ? ` | Coupon: ${couponCode}` : ''}`,
        couponId,
        discountAmount
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
    const successUrl = `${baseUrl}/${currentLocale}/payment/success?pid=${purchase.id}`;
    const failUrl = `${baseUrl}/${currentLocale}/payment/fail`;
    const pendingUrl = `${baseUrl}/${currentLocale}/payment/pending`;

    console.log("DEBUG - Fawaterak Redirects:", { successUrl, failUrl, pendingUrl });

    const paymentData = await fawaterakClient.initPayment({
      payment_method_id: paymentMethodId,
      vendor_id: process.env.FAWATERAK_VENDOR_KEY?.includes('.') ? process.env.FAWATERAK_VENDOR_KEY.split('.').pop() : process.env.FAWATERAK_VENDOR_KEY,
      cartTotal: amount,
      currency: region === "egypt" ? "EGP" : "USD",
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: email || "customer@example.com",
        phone: whatsapp.replace(/\+/g, ""),
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
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        invoiceId: paymentData.invoice_id.toString(),
        invoiceKey: paymentData.invoice_key,
      },
    });

    // 6. Increment coupon usage if applied
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } }
      });
    }

    // 7. Send pending email to client + admin notification
    const paymentMethodLabel = paymentMethodId === 2 ? "Card" : paymentMethodId === 3 ? "Fawry" : "Other";
    try {
      await Promise.all([
        email ? sendPendingEmail({ clientName, email, planName: plan.nameEn, amount, currency: region === "egypt" ? "EGP" : "USD" }) : Promise.resolve(),
        sendAdminEmail({ clientName, email: email || "", whatsapp, planName: plan.nameEn, amount, currency: region === "egypt" ? "EGP" : "USD", paymentMethod: paymentMethodLabel, invoiceId: paymentData.invoice_id?.toString() || null, region, notes: `Plan Type: ${planType || 'monthly'}${couponCode ? ` | Coupon: ${couponCode}` : ''}`, discountAmount, couponCode: couponCode || null }),
      ]);
    } catch (emailErr) {
      console.error("Email error (non-fatal):", emailErr);
    }

    return NextResponse.json({
      status: "success",
      url: paymentData.url || paymentData.payment_data?.redirectTo,
      paymentData: paymentData.payment_data,
      invoiceId: paymentData.invoice_id,
      purchaseId: purchase.id
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
