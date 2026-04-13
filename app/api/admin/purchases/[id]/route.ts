import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fawaterakClient } from "@/lib/fawaterak";

// PATCH: Update order status (e.g., Mark as Paid)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    const updated = await prisma.purchase.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE: Remove an order
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.purchase.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// POST: Handle Actions like "SYNC"
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (body.action === 'sync') {
      const purchase = await prisma.purchase.findUnique({
        where: { id },
      });

      if (!purchase || !purchase.invoiceId) {
        return NextResponse.json({ error: "Order or Invoice ID not found" }, { status: 404 });
      }

      console.log(`Consolidated Sync for order ${id} (Invoice: ${purchase.invoiceId})...`);
      const remoteInvoice = await fawaterakClient.getInvoiceData(purchase.invoiceId);
      
      const isPaid = 
        remoteInvoice.payment_status === "paid" || 
        (remoteInvoice as any).invoice_status === "paid" ||
        (remoteInvoice as any).paid === 1;

      const updated = await prisma.purchase.update({
        where: { id },
        data: {
          status: isPaid ? "COMPLETED" : "PENDING",
          paymentMethod: remoteInvoice.payment_method || purchase.paymentMethod,
        },
      });

      const fawaterakStatusLabel = 
        remoteInvoice.payment_status || 
        (remoteInvoice as any).invoice_status || 
        (isPaid ? "paid" : "pending");

      return NextResponse.json({ 
        success: true, 
        status: updated.status,
        fawaterakStatus: fawaterakStatusLabel
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Action Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
