import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";
import { sendClientEmail, sendAdminEmail } from "@/lib/email";

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

    // Verify with Fawaterak
    const remoteInvoice = await fawaterakClient.getInvoiceData(purchase.invoiceId);

    const isPaid =
      remoteInvoice.payment_status === "paid" ||
      (remoteInvoice as any).invoice_status === "paid" ||
      (remoteInvoice as any).paid === 1;

    if (!isPaid) {
      return NextResponse.json({ success: false, paid: false });
    }

    // Update purchase status
    const updatedPurchase = await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: "COMPLETED",
        paymentMethod: remoteInvoice.payment_method || purchase.paymentMethod,
      },
      include: { plan: true },
    });

    // Send emails
    const emailData = {
      clientName: updatedPurchase.clientName,
      email: updatedPurchase.email || "",
      whatsapp: updatedPurchase.whatsapp,
      planName: updatedPurchase.plan.nameEn,
      amount: updatedPurchase.amount,
      currency: updatedPurchase.currency,
      paymentMethod: updatedPurchase.paymentMethod,
      invoiceId: updatedPurchase.invoiceId,
      region: updatedPurchase.region,
      notes: updatedPurchase.notes,
      discountAmount: updatedPurchase.discountAmount,
      couponCode: updatedPurchase.notes?.match(/Coupon: (\S+)/)?.[1] || null,
    };

    try {
      await Promise.all([
        sendClientEmail(emailData),
        sendAdminEmail(emailData),
      ]);
    } catch (err) {
      console.error("Email send error (verify-payment):", err);
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (error: any) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
