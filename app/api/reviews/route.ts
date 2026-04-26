import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planId = searchParams.get("planId");

  if (!planId) {
    return NextResponse.json({ error: "planId is required" }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { 
        planId,
        isApproved: true 
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, rating, comment, planId } = body;

    if (!clientName || !rating || !comment || !planId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        clientName,
        rating: Number(rating),
        comment,
        planId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
