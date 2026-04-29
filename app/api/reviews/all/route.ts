import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
      include: {
        plan: {
          select: {
            nameEn: true,
            nameAr: true,
          }
        }
      }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
