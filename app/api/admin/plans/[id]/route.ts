import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if plan has purchases
    const purchaseCount = await prisma.purchase.count({
      where: { planId: id },
    });

    if (purchaseCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete — this plan has ${purchaseCount} purchase(s). Deactivate it instead.` },
        { status: 400 }
      );
    }

    await prisma.plan.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete plan error:", error);
    return NextResponse.json(
      { error: "Failed to delete plan" },
      { status: 500 }
    );
  }
}
