import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const planId = searchParams.get("planId");
  const date = searchParams.get("date");

  if (!planId || !date) {
    return NextResponse.json({ error: "Missing planId or date" }, { status: 400 });
  }

  const purchases = await prisma.purchase.findMany({
    where: {
      planId,
      bookedDate: date,
      status: { not: "CANCELLED" },
    },
    select: { bookedTime: true },
  });

  const bookedTimes = purchases
    .map((p) => p.bookedTime)
    .filter((t): t is string => !!t);

  return NextResponse.json({ bookedTimes });
}
