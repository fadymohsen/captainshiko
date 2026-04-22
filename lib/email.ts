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
  whatsapp: string | null;
  planName: string;
  amount: number;
  currency: string;
  paymentMethod: string | null;
  invoiceId: string | null;
  region: string | null;
  notes: string | null;
  discountAmount: number;
  couponCode: string | null;
}

const WHATSAPP_NUMBER = "201553038830";

export async function sendClientEmail(data: PurchaseEmailData) {
  if (!data.email) return;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Coach! I just subscribed and I'm ready to start!")}`;

  await transporter.sendMail({
    from: `"Coach Mohamed Roshdy" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "Welcome to the Team! Let's Start Your Journey",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ltr;">
        <div style="background: linear-gradient(135deg, #8b1a1a, #b91c1c); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 800;">Welcome, ${data.clientName}!</h1>
        </div>
        <div style="background: #ffffff; padding: 35px 30px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 17px; color: #111827; line-height: 1.7; margin-bottom: 10px;">
            <strong>Coach Mohamed Roshdy</strong> is happy to start working with you!
          </p>
          <p style="font-size: 16px; color: #374151; line-height: 1.7; margin-bottom: 25px;">
            Let's change our lives and mindset.
          </p>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
            <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Your Plan</p>
            <p style="margin: 0; color: #111827; font-size: 20px; font-weight: 800;">${data.planName}</p>
          </div>

          <p style="font-size: 16px; color: #374151; line-height: 1.7; margin-bottom: 30px;">
            Text us on WhatsApp to start our journey together!
          </p>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background: #25D366; color: white; font-size: 16px; font-weight: 700; padding: 14px 40px; border-radius: 10px; text-decoration: none;">
              Start on WhatsApp
            </a>
          </div>

        </div>
        <div style="background: #111827; padding: 15px; text-align: center; border-radius: 0 0 12px 12px;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">coachmohamedroshdy.com</p>
        </div>
      </div>
    `,
  });
}

interface PendingEmailData {
  clientName: string;
  email: string;
  planName: string;
  amount: number;
  currency: string;
}

export async function sendPendingEmail(data: PendingEmailData) {
  if (!data.email) return;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Coach! I just subscribed and I'm waiting for confirmation.")}`;

  await transporter.sendMail({
    from: `"Coach Mohamed Roshdy" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "We Received Your Order — Pending Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ltr;">
        <div style="background: linear-gradient(135deg, #8b1a1a, #b91c1c); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 800;">Thank You, ${data.clientName}!</h1>
        </div>
        <div style="background: #ffffff; padding: 35px 30px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 17px; color: #111827; line-height: 1.7; margin-bottom: 20px;">
            We received your order and payment receipt. Our team is reviewing it now.
          </p>

          <div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 10px; padding: 20px; margin-bottom: 25px; text-align: center;">
            <p style="margin: 0 0 5px; color: #92400e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Order Status</p>
            <p style="margin: 0; color: #b45309; font-size: 24px; font-weight: 800;">⏳ PENDING</p>
          </div>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Plan</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; font-size: 14px;">${data.planName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Amount</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; font-size: 14px; color: #16a34a;">${data.amount} ${data.currency}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 16px; color: #374151; line-height: 1.7; margin-bottom: 30px;">
            You'll receive a confirmation email once your payment is verified. If you have any questions, reach out on WhatsApp!
          </p>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background: #25D366; color: white; font-size: 16px; font-weight: 700; padding: 14px 40px; border-radius: 10px; text-decoration: none;">
              Contact on WhatsApp
            </a>
          </div>
        </div>
        <div style="background: #111827; padding: 15px; text-align: center; border-radius: 0 0 12px 12px;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">coachmohamedroshdy.com</p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminEmail(data: PurchaseEmailData) {
  if (!ADMIN_EMAIL) return;

  await transporter.sendMail({
    from: `"Captain Shiko System" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `⏳ PENDING — ${data.clientName} — ${data.planName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111827; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #f97316; margin: 0; font-size: 20px;">New Subscription — PENDING</h1>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 12px; text-align: center; margin-bottom: 20px;">
            <span style="color: #b45309; font-size: 16px; font-weight: 800; letter-spacing: 2px;">⏳ PENDING CONFIRMATION</span>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Client Name</td>
              <td style="padding: 12px 0; text-align: right; font-weight: 700; font-size: 14px;">${data.clientName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Email</td>
              <td style="padding: 12px 0; text-align: right; font-size: 14px;">${data.email || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">WhatsApp</td>
              <td style="padding: 12px 0; text-align: right; font-size: 14px;">${data.whatsapp || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Plan</td>
              <td style="padding: 12px 0; text-align: right; font-weight: 700; font-size: 14px;">${data.planName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Amount Paid</td>
              <td style="padding: 12px 0; text-align: right; font-weight: 700; font-size: 14px; color: #16a34a;">${data.amount} ${data.currency}</td>
            </tr>
            ${data.discountAmount > 0 ? `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Discount</td>
              <td style="padding: 12px 0; text-align: right; font-size: 14px; color: #f97316;">-${data.discountAmount} ${data.currency}${data.couponCode ? ` (${data.couponCode})` : ""}</td>
            </tr>` : ""}
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Payment Method</td>
              <td style="padding: 12px 0; text-align: right; font-size: 14px;">${data.paymentMethod || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Region</td>
              <td style="padding: 12px 0; text-align: right; font-size: 14px;">${data.region || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Invoice #</td>
              <td style="padding: 12px 0; text-align: right; font-size: 14px;">${data.invoiceId || "N/A"}</td>
            </tr>
            ${data.notes ? `
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Notes</td>
              <td style="padding: 12px 0; text-align: right; font-size: 14px;">${data.notes}</td>
            </tr>` : ""}
          </table>
        </div>
      </div>
    `,
  });
}
