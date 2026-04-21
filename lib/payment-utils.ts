import prisma from "./prisma";
import { fawaterakClient } from "./fawaterak";
import { sendClientEmail, sendAdminEmail } from "./email";

/**
 * Common logic for verifying a payment with Fawaterak, updating the database,
 * and sending confirmation emails.
 * Used by: Webhook, Manual Sync button, and automated Cron job.
 */
export async function handlePaymentVerification(invoiceId: string) {
  // 1. Verify with Fawaterak API
  const remoteInvoice = await fawaterakClient.getInvoiceData(invoiceId);

  const isPaid =
    remoteInvoice.payment_status === "paid" ||
    (remoteInvoice as any).invoice_status === "paid" ||
    (remoteInvoice as any).paid === 1 ||
    (remoteInvoice as any).status === "paid";

  console.log(`[PaymentSync] Invoice ${invoiceId}: isPaid=${isPaid}`, JSON.stringify(remoteInvoice));

  // 2. Find local purchase
  const purchase = await prisma.purchase.findUnique({
    where: { invoiceId: invoiceId.toString() },
  });

  if (!purchase) {
    console.error(`[PaymentSync] Purchase not found for invoiceId: ${invoiceId}`);
    return { success: false, error: "Purchase not found" };
  }

  // 3. Skip if already completed or failed (avoid duplicate processing/emails)
  if (purchase.status === "COMPLETED") {
    console.log(`[PaymentSync] Purchase ${purchase.id} already COMPLETED. Skipping.`);
    return { success: true, alreadyCompleted: true };
  }

  // 4. Update status in DB
  const updatedPurchase = await prisma.purchase.update({
    where: { id: purchase.id },
    data: {
      status: isPaid ? "COMPLETED" : "FAILED",
      paymentMethod: remoteInvoice.payment_method || purchase.paymentMethod,
    },
    include: { plan: true },
  });

  // 5. Send emails on successful payment
  if (isPaid) {
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
      // Send parallel, but await them here for reliability in cron/webhook context
      await Promise.all([
        sendClientEmail(emailData),
        sendAdminEmail(emailData),
      ]);
      console.log("[PaymentSync] Emails sent successfully for invoice:", invoiceId);
    } catch (err) {
      console.error("[PaymentSync] Email send error:", err);
    }
  }

  return { success: true, verified: isPaid };
}
