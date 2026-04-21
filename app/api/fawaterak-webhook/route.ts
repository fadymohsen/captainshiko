import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";
import { sendClientEmail, sendAdminEmail } from "@/lib/email";

async function parseBody(req: Request): Promise<Record<string, any>> {
  const contentType = req.headers.get("content-type") || "";

  // Try form-encoded first (Fawaterak often sends this)
  if (contentType.includes("form")) {
    const formData = await req.formData();
    const obj: Record<string, any> = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  // Try JSON
  const text = await req.text();
  try {
    return JSON.parse(text);
  } catch {
    // Try to parse as URL-encoded
    const params = new URLSearchParams(text);
    const obj: Record<string, any> = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
}

async function handlePaymentVerification(invoiceId: string) {
  // Verify with Fawaterak API
  const remoteInvoice = await fawaterakClient.getInvoiceData(invoiceId);

  const isPaid =
    remoteInvoice.payment_status === "paid" ||
    (remoteInvoice as any).invoice_status === "paid" ||
    (remoteInvoice as any).paid === 1 ||
    (remoteInvoice as any).status === "paid";

  console.log(`Webhook Verification for Invoice ${invoiceId}: isPaid=${isPaid}`, JSON.stringify(remoteInvoice));

  // Find local purchase
  const purchase = await prisma.purchase.findUnique({
    where: { invoiceId: invoiceId.toString() },
  });

  if (!purchase) {
    console.error(`Purchase not found for invoiceId: ${invoiceId}`);
    return { success: false, error: "Purchase not found" };
  }

  // Skip if already completed
  if (purchase.status === "COMPLETED") {
    return { success: true, alreadyCompleted: true };
  }

  // Update status
  const updatedPurchase = await prisma.purchase.update({
    where: { id: purchase.id },
    data: {
      status: isPaid ? "COMPLETED" : "FAILED",
      paymentMethod: remoteInvoice.payment_method || purchase.paymentMethod,
    },
    include: { plan: true },
  });

  // Send emails on successful payment
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
      await Promise.all([
        sendClientEmail(emailData),
        sendAdminEmail(emailData),
      ]);
      console.log("Emails sent successfully for invoice:", invoiceId);
    } catch (err) {
      console.error("Email send error:", err);
    }
  }

  return { success: true, verified: isPaid };
}

// Handle POST (webhook from Fawaterak)
export async function POST(req: Request) {
  try {
    const body = await parseBody(req);
    console.log("Fawaterak Webhook received:", JSON.stringify(body));

    // Try every possible field name Fawaterak might use
    const invoiceId =
      body.invoice_id ||
      body.invoiceId ||
      body.InvoiceId ||
      body.invoice ||
      body.id ||
      body.fawaterak_invoice_id;

    if (!invoiceId) {
      console.error("No invoice_id found in webhook body:", JSON.stringify(body));
      return NextResponse.json({ error: "No invoice_id in payload", receivedKeys: Object.keys(body) }, { status: 400 });
    }

    const result = await handlePaymentVerification(invoiceId.toString());
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle GET (for testing — also allows Fawaterak GET callbacks)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const invoiceId = url.searchParams.get("invoice_id") || url.searchParams.get("invoiceId");

    if (!invoiceId) {
      return NextResponse.json({ status: "Webhook endpoint is live", params: Object.fromEntries(url.searchParams) });
    }

    const result = await handlePaymentVerification(invoiceId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Webhook GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
