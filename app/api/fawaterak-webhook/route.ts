import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";
import { handlePaymentVerification } from "@/lib/payment-utils";

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
