import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handlePaymentVerification } from "@/lib/payment-utils";

/**
 * Automated Cron Job Route
 * triggered every minute (via vercel.json) to sync pending payments.
 */
export async function GET(req: Request) {
  // 1. Security Check
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Only return unauthorized if in production; allow manual testing in dev if needed
    if (process.env.NODE_ENV === 'production') {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  try {
    console.log("[Cron] Starting Payment Sync...");

    // 2. Fetch all PENDING purchases from the last 24 hours
    // (We don't want to poll forever for old abandoned checkouts)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const pendingPurchases = await prisma.purchase.findMany({
      where: {
        status: "PENDING",
        createdAt: { gte: oneDayAgo },
        invoiceId: { not: null }
      },
      select: {
        id: true,
        invoiceId: true,
      }
    });

    console.log(`[Cron] Found ${pendingPurchases.length} pending purchases to verify.`);

    const results = [];
    
    // 3. Process each purchase
    // We use a loop instead of Promise.all to avoid hitting Fawaterak API rate limits
    // and to ensure we don't time out the serverless function if there are many orders.
    for (const purchase of pendingPurchases) {
      if (!purchase.invoiceId) continue;
      
      try {
        console.log(`[Cron] Verifying Purchase: ${purchase.id} (Invoice: ${purchase.invoiceId})`);
        const result = await handlePaymentVerification(purchase.invoiceId);
        results.push({ id: purchase.id, ...result });
      } catch (err: any) {
        console.error(`[Cron] Failed to verify purchase ${purchase.id}:`, err.message);
        results.push({ id: purchase.id, success: false, error: err.message });
      }
    }

    return NextResponse.json({
      status: "success",
      processed: pendingPurchases.length,
      results
    });

  } catch (error: any) {
    console.error("[Cron] Payment Sync Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
