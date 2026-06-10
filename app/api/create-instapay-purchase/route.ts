import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPendingEmail, sendAdminEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, clientName, email, whatsapp, region, planType, couponCode, bookedDate, bookedTime } = body;

    if (!planId || !clientName || !whatsapp || !region) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Price logic
    let amountStr = planType === "quarterly"
      ? (region === "egypt" ? (plan.salePriceQuarterlyEgp || plan.priceQuarterlyEgp) : (plan.salePriceQuarterlyUsd || plan.priceQuarterlyUsd))
      : (region === "egypt" ? (plan.salePriceMonthlyEgp || plan.priceMonthlyEgp) : (plan.salePriceMonthlyUsd || plan.priceMonthlyUsd));

    let amount = parseFloat(amountStr || "0");
    let discountAmount = 0;
    let couponId = null;

    // Handle Coupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (coupon && coupon.isActive) {
        let isValid = true;
        if (!coupon.appliesToAll && !coupon.planIds.includes(planId)) isValid = false;
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

    // Slot conflict check for booking plans
    if (bookedDate && bookedTime) {
      const conflicting = await prisma.purchase.findFirst({
        where: { planId: plan.id, bookedDate, bookedTime, status: { not: "CANCELLED" } },
      });
      if (conflicting) {
        return NextResponse.json({ error: "This time slot is no longer available. Please choose another." }, { status: 409 });
      }
    }

    // Create purchase with InstaPay method
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
        paymentMethod: "InstaPay",
        notes: `Plan Type: ${planType || 'monthly'}${couponCode ? ` | Coupon: ${couponCode}` : ''} | InstaPay${bookedDate ? ` | Booked: ${bookedDate} ${bookedTime}` : ''}`,
        couponId,
        discountAmount,
        ...(bookedDate ? { bookedDate } : {}),
        ...(bookedTime ? { bookedTime } : {}),
      },
    });

    // Increment coupon usage if applied
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } },
      });
    }

    // Send pending email to client + admin notification
    try {
      await Promise.all([
        email ? sendPendingEmail({ clientName, email, planName: plan.nameEn, amount, currency: region === "egypt" ? "EGP" : "USD" }) : Promise.resolve(),
        sendAdminEmail({ clientName, email: email || "", whatsapp, planName: plan.nameEn, amount, currency: region === "egypt" ? "EGP" : "USD", paymentMethod: "InstaPay", invoiceId: null, region, notes: `Plan Type: ${planType || 'monthly'}${couponCode ? ` | Coupon: ${couponCode}` : ''} | InstaPay`, discountAmount, couponCode: couponCode || null }),
      ]);
    } catch (emailErr) {
      console.error("Email error (non-fatal):", emailErr);
    }

    return NextResponse.json({
      status: "success",
      purchaseId: purchase.id,
    });
  } catch (error: any) {
    console.error("Create InstaPay Purchase Error:", error);
    return NextResponse.json({
      error: error.message || "Internal server error",
    }, { status: 500 });
  }
}
