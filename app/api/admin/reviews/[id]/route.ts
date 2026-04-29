import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (body.showOnHome !== undefined) {
      await prisma.$executeRaw`UPDATE "Review" SET "showOnHome" = ${body.showOnHome} WHERE "id" = ${id}`;
    }
    if (body.isApproved !== undefined) {
      await prisma.$executeRaw`UPDATE "Review" SET "isApproved" = ${body.isApproved} WHERE "id" = ${id}`;
    }

    const updated = await prisma.review.findUnique({ where: { id } });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}
