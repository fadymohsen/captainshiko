import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { code, planId, email, whatsapp } = await req.json();

    if (!code || !planId) {
      return NextResponse.json({ error: "Code and Plan ID are required" }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
      include: { purchases: true }
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ error: "Invalid or expired coupon" }, { status: 404 });
    }

    // 1. Check if applies to this plan
    if (!coupon.appliesToAll && !coupon.planIds.includes(planId)) {
      return NextResponse.json({ error: "This coupon is not valid for the selected plan" }, { status: 400 });
    }

    // 2. Check total limit
    if (coupon.totalLimit && coupon.usageCount >= coupon.totalLimit) {
      return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
    }

    // 3. Check per-user limit
    if (coupon.perUserLimit) {
      const userPurchases = coupon.purchases.filter(p => 
        (email && p.email === email) || (whatsapp && p.whatsapp === whatsapp)
      );
      if (userPurchases.length >= coupon.perUserLimit) {
        return NextResponse.json({ error: "You've already used this coupon" }, { status: 400 });
      }
    }

    return NextResponse.json({
      valid: true,
      type: coupon.type,
      value: coupon.value,
      couponId: coupon.id
    });

  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
