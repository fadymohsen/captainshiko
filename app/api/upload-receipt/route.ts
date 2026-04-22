import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { sendPendingEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const purchaseId = formData.get("purchaseId") as string;
    const receipt = formData.get("receipt") as File | null;

    if (!purchaseId || !receipt || receipt.size === 0) {
      return NextResponse.json({ error: "Missing purchase ID or receipt" }, { status: 400 });
    }

    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: { plan: true, coupon: true },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    // Upload receipt to Vercel Blob
    const blob = await put(`receipts/${purchaseId}-${receipt.name}`, receipt, {
      access: "public",
    });

    // Update purchase with receipt URL
    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { receiptUrl: blob.url },
    });

    // Send pending email to client
    if (purchase.email) {
      try {
        await sendPendingEmail({
          clientName: purchase.clientName,
          email: purchase.email,
          planName: purchase.plan?.nameEn || "Plan",
          amount: purchase.amount,
          currency: purchase.currency,
        });
      } catch (emailErr) {
        console.error("Pending email error (non-fatal):", emailErr);
      }
    }

    return NextResponse.json({ status: "success", receiptUrl: blob.url });
  } catch (error: any) {
    console.error("Upload receipt error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
