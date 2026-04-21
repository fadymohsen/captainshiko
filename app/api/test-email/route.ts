import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Test the connection
    await transporter.verify();

    // Send a test email
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
