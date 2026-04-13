import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find the purchase in our DB
    const purchase = await prisma.purchase.findUnique({
      where: { id },
    });

    if (!purchase || !purchase.invoiceId) {
      return NextResponse.json({ error: "Order or Invoice ID not found" }, { status: 404 });
    }

    // Ask Fawaterak for the LATEST status
    console.log(`Syncing order ${id} (Invoice: ${purchase.invoiceId}) with Fawaterak...`);
    const remoteInvoice = await fawaterakClient.getInvoiceData(purchase.invoiceId);
    
    const isPaid = 
      remoteInvoice.payment_status === "paid" || 
      (remoteInvoice as any).invoice_status === "paid" ||
      (remoteInvoice as any).paid === 1;

    console.log(`Live Status for Invoice ${purchase.invoiceId}: ${remoteInvoice.payment_status}`);

    // Update our DB with the truth from Fawaterak
    const updated = await prisma.purchase.update({
      where: { id },
      data: {
        status: isPaid ? "COMPLETED" : "PENDING",
        paymentMethod: remoteInvoice.payment_method || purchase.paymentMethod,
      },
      include: { plan: true }
    });

    return NextResponse.json({ 
      success: true, 
      status: updated.status,
      fawaterakStatus: remoteInvoice.payment_status 
    });

  } catch (error: any) {
    console.error("Sync Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
