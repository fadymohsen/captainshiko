import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 1. Check common edge headers first (very fast, reliable on hosting platforms)
  const country = 
    request.headers.get("x-vercel-ip-country") || 
    request.headers.get("cf-ipcountry") || 
    request.headers.get("x-country-code");

  if (country) {
    return NextResponse.json({ 
      region: country.toUpperCase() === "EG" ? "egypt" : "abroad",
      source: "header",
      country
    });
  }

  // 2. Fallback: Perform a server-side lookup (bypasses browser ad-blockers)
  try {
    const response = await fetch("https://ipapi.co/json/", { 
      cache: "no-store",
      next: { revalidate: 0 }
    });
    const data = await response.json();
    
    return NextResponse.json({
      region: data.country_code === "EG" ? "egypt" : "abroad",
      source: "fallback-api",
      country: data.country_code
    });
  } catch (error) {
    return NextResponse.json({ 
      region: "abroad", 
      source: "error-fallback",
      error: (error as Error).message 
    }, { status: 200 });
  }
}
