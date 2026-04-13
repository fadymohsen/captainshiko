import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";

export async function POST(req: Request) {
  console.log("POST /api/create-payment - Start");
  try {
    const body = await req.json();
    const { planId, clientName, email, whatsapp, region, planType, paymentMethodId } = body;

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

    // 2. Price Logic (Currently EGP as per user request)
    const amountStr = planType === "quarterly" ? plan.priceQuarterlyEgp : plan.priceMonthlyEgp;
    const amount = parseFloat(amountStr || "0");

    if (amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // 3. Create Pending Purchase
    const purchase = await prisma.purchase.create({
      data: {
        clientName,
        email,
        whatsapp,
        planId: plan.id,
        amount,
        currency: "EGP",
        status: "PENDING",
        region,
        paymentMethod: paymentMethodId === 2 ? "Card" : paymentMethodId === 3 ? "Fawry" : "Wallet",
        notes: `Plan Type: ${planType || 'monthly'}`
      },
    });

    // 4. Init Fawaterak
    const names = clientName.trim().split(" ");
    const firstName = names[0] || "Client";
    const lastName = names.slice(1).join(" ") || "User";

    const paymentData = await fawaterakClient.initPayment({
      payment_method_id: paymentMethodId,
      cartTotal: amount,
      currency: "EGP",
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
        successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?purchaseId=${purchase.id}`,
        failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/plans`,
        pendingUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/plans`,
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

    return NextResponse.json({ 
      status: "success",
      url: paymentData.url || paymentData.payment_data?.redirectTo, 
      paymentData: paymentData.payment_data,
      invoiceId: paymentData.invoice_id
    });

  } catch (error: any) {
    console.error("Create Payment Error:", error);
    // Ensure we always return a string for 'error'
    const message = error.message || (typeof error === 'string' ? error : "Internal server error");
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
