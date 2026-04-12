import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 1. Check common edge headers first (extremely fast and accurate on Vercel)
  const countryHeader = 
    request.headers.get("x-vercel-ip-country") || 
    request.headers.get("cf-ipcountry") || 
    request.headers.get("x-country-code");

  if (countryHeader) {
    const code = countryHeader.toUpperCase();
    return NextResponse.json({ 
      region: code === "EG" ? "egypt" : "abroad",
      source: "header",
      country: code
    });
  }

  // 2. Identify the Client IP
  // On Vercel, this is usually x-forwarded-for. On localhost, it's often ::1 or 127.0.0.1
  const forwarded = request.headers.get("x-forwarded-for");
  const clientIp = forwarded ? forwarded.split(",")[0].trim() : null;
  const isLocal = !clientIp || clientIp === "::1" || clientIp === "127.0.0.1" || clientIp.startsWith("192.168.") || clientIp.startsWith("10.");

  // 3. Perform a server-side lookup
  try {
    // If local, just call /json/ which detects the machine's IP.
    // If on server, we MUST pass the client's IP to avoid getting the server's location.
    const apiUrl = isLocal ? "https://ipapi.co/json/" : `https://ipapi.co/${clientIp}/json/`;
    
    const response = await fetch(apiUrl, { 
      cache: "no-store",
      next: { revalidate: 0 }
    });
    
    if (!response.ok) throw new Error(`External API failed: ${response.status}`);
    
    const data = await response.json();
    const code = (data.country_code || "").toUpperCase();
    
    return NextResponse.json({
      region: code === "EG" ? "egypt" : "abroad",
      source: isLocal ? "fallback-api-local" : "fallback-api-client",
      country: code,
      ip: clientIp || "local"
    });
  } catch (error) {
    console.error("Geo API Fallback Error:", error);
    return NextResponse.json({ 
      region: "abroad", 
      source: "error-fallback",
      error: (error as Error).message 
    }, { status: 200 });
  }
}
