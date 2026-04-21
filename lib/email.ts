import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM || process.env.SMTP_USER || "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

interface PurchaseEmailData {
  clientName: string;
  email: string;
  planName: string;
  amount: number;
  currency: string;
  paymentMethod: string | null;
  invoiceId: string | null;
}

export async function sendClientEmail(data: PurchaseEmailData) {
  if (!data.email) return;

  await transporter.sendMail({
    from: `"Captain Shiko" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "Payment Confirmed — Captain Shiko",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ltr;">
        <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Payment Successful!</h1>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #374151;">Hi <strong>${data.clientName}</strong>,</p>
          <p style="font-size: 15px; color: #4b5563;">
            Thank you for your purchase! Your subscription has been confirmed.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Plan</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #111827;">${data.planName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Amount</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #111827;">${data.amount} ${data.currency}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Payment Method</td>
              <td style="padding: 10px 0; text-align: right; color: #111827;">${data.paymentMethod || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;">Invoice #</td>
              <td style="padding: 10px 0; text-align: right; color: #111827;">${data.invoiceId || "N/A"}</td>
            </tr>
          </table>
          <p style="font-size: 14px; color: #6b7280;">
            If you have any questions, feel free to reach out to us on WhatsApp.
          </p>
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            Best regards,<br><strong>Captain Shiko Team</strong>
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminEmail(data: PurchaseEmailData) {
  if (!ADMIN_EMAIL) return;

  await transporter.sendMail({
    from: `"Captain Shiko" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `New Purchase — ${data.clientName} — ${data.planName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111827; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #f97316; margin: 0; font-size: 20px;">New Subscription Payment</h1>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Client Name</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600;">${data.clientName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Email</td>
              <td style="padding: 10px 0; text-align: right;">${data.email || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Plan</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600;">${data.planName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Amount</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #16a34a;">${data.amount} ${data.currency}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Payment Method</td>
              <td style="padding: 10px 0; text-align: right;">${data.paymentMethod || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;">Invoice #</td>
              <td style="padding: 10px 0; text-align: right;">${data.invoiceId || "N/A"}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  });
}
