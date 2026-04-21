import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";
import { handlePaymentVerification } from "@/lib/payment-utils";

export async function POST(req: Request) {
  try {
    const { invoiceId, purchaseId } = await req.json();

    if (!invoiceId && !purchaseId) {
      return NextResponse.json({ error: "Missing invoiceId or purchaseId" }, { status: 400 });
    }

    const purchase = purchaseId
      ? await prisma.purchase.findUnique({ where: { id: purchaseId }, include: { plan: true } })
      : await prisma.purchase.findUnique({ where: { invoiceId: invoiceId.toString() }, include: { plan: true } });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    // If already completed and emails were sent, skip
    if (purchase.status === "COMPLETED") {
      return NextResponse.json({ success: true, alreadyCompleted: true });
    }

    if (!purchase.invoiceId) {
      return NextResponse.json({ error: "No invoice linked" }, { status: 400 });
    }

    const result = await handlePaymentVerification(purchase.invoiceId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
