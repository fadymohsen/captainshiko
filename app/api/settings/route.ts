import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "key is required" }, { status: 400 });
  }

  try {
    const setting = await prisma.setting.findUnique({
      where: { key },
    });

    return NextResponse.json({ value: setting?.value || "false" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch setting" }, { status: 500 });
  }
}
