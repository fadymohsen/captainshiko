import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";
import { sendClientEmail, sendAdminEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Fawaterak Webhook (Professional) received:", body);

    const { invoice_id } = body;

    if (!invoice_id) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    // CRITICAL: Verify payment status directly with Fawaterak API
    const remoteInvoice = await fawaterakClient.getInvoiceData(invoice_id);
    
    // Check various possible status fields for maximum reliability
    const isPaid = 
      remoteInvoice.payment_status === "paid" || 
      (remoteInvoice as any).invoice_status === "paid" ||
      (remoteInvoice as any).paid === 1;

    console.log(`Webhook Verification for Invoice ${invoice_id}: isPaid=${isPaid}`, remoteInvoice);

    // Find local purchase
    console.log(`Searching for local purchase with invoiceId: ${invoice_id}`);
    const purchase = await prisma.purchase.findUnique({
      where: { invoiceId: invoice_id.toString() },
    });

    if (!purchase) {
      console.error(`Purchase not found for invoiceId: ${invoice_id}`);
      return NextResponse.json({ error: "Local purchase not found" }, { status: 404 });
    }

    // Update status based on server-to-server verification
    const updatedPurchase = await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: isPaid ? "COMPLETED" : "FAILED",
        paymentMethod: remoteInvoice.payment_method || purchase.paymentMethod,
      },
      include: { plan: true },
    });

    // Send confirmation emails on successful payment
    if (isPaid) {
      const emailData = {
        clientName: updatedPurchase.clientName,
        email: updatedPurchase.email || "",
        planName: updatedPurchase.plan.nameEn,
        amount: updatedPurchase.amount,
        currency: updatedPurchase.currency,
        paymentMethod: updatedPurchase.paymentMethod,
        invoiceId: updatedPurchase.invoiceId,
      };

      // Send emails in parallel, don't block the webhook response
      Promise.all([
        sendClientEmail(emailData),
        sendAdminEmail(emailData),
      ]).catch((err) => console.error("Email send error:", err));
    }

    return NextResponse.json({ success: true, verified: isPaid });

  } catch (error: any) {
    console.error("Webhook Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
