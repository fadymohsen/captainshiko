import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import { sendClientEmail, sendAdminEmail } from "@/lib/email";

// GET /api/test-email — test SMTP connection
export async function GET() {
  const config = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    from: process.env.SMTP_FROM,
    admin: process.env.ADMIN_EMAIL,
    hasPass: !!process.env.SMTP_PASS,
  };

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Captain Shiko Test" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email — Captain Shiko",
      html: "<h1>Email is working!</h1><p>If you see this, the SMTP config is correct.</p>",
    });

    return NextResponse.json({ success: true, message: "Test email sent!", config });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      config,
    }, { status: 500 });
  }
}

// POST /api/test-email — send real emails for the latest COMPLETED purchase
export async function POST() {
  try {
    const purchase = await prisma.purchase.findFirst({
      where: { status: "COMPLETED" },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });

    if (!purchase) {
      return NextResponse.json({ error: "No completed purchase found" }, { status: 404 });
    }

    const emailData = {
      clientName: purchase.clientName,
      email: purchase.email || "",
      whatsapp: purchase.whatsapp,
      planName: purchase.plan.nameEn,
      amount: purchase.amount,
      currency: purchase.currency,
      paymentMethod: purchase.paymentMethod,
      invoiceId: purchase.invoiceId,
      region: purchase.region,
      notes: purchase.notes,
      discountAmount: purchase.discountAmount,
      couponCode: purchase.notes?.match(/Coupon: (\S+)/)?.[1] || null,
    };

    await Promise.all([
      sendClientEmail(emailData),
      sendAdminEmail(emailData),
    ]);

    return NextResponse.json({
      success: true,
      message: "Both emails sent!",
      purchase: {
        id: purchase.id,
        clientName: purchase.clientName,
        email: purchase.email,
        planName: purchase.plan.nameEn,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
