import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service } = body;

    // Basic validation
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and service are required." },
        { status: 400 }
      );
    }

    try {
      await resend.emails.send({
        from: `Pentacloud Website <notifications@pentacloud.in>`,
        to: process.env.MICROSOFT_EMAIL_USER || "contactus@pentacloudconsulting.com",
        replyTo: email,
        subject: `📩 New Enquiry from ${name} — ${service}`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1A7FD4 0%,#0D5FA0 100%);padding:36px 40px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                        📬 New Contact Form Submission
                      </h1>
                      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">
                        Pentacloud Consulting — Website Contact Form
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="margin:0 0 24px;color:#4A6080;font-size:14px;line-height:1.6;">
                        A new enquiry has been submitted through the Pentacloud Consulting website. Here are the details:
                      </p>

                      <!-- Details table -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        ${renderRow("👤 Full Name", name)}
                        ${renderRow("📧 Work Email", `<a href="mailto:${email}" style="color:#1A7FD4;text-decoration:none;">${email}</a>`)}
                        ${phone ? renderRow("📞 Phone Number", phone) : ""}
                        ${company ? renderRow("🏢 Company", company) : ""}
                        ${renderRow("🎯 Service Interested In", service)}
                      </table>

                      <!-- CTA -->
                      <div style="margin-top:32px;text-align:center;">
                        <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#1A7FD4,#0D5FA0);color:#fff;text-decoration:none;padding:14px 36px;border-radius:10px;font-weight:700;font-size:14px;letter-spacing:0.3px;">
                          Reply to ${name.split(" ")[0]}
                        </a>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;border-top:1px solid #e8edf2;padding:20px 40px;text-align:center;">
                      <p style="margin:0;color:#94a3b8;font-size:12px;">
                        This email was sent from the contact form at 
                        <a href="https://pentacloud.in" style="color:#1A7FD4;text-decoration:none;">pentacloud.in</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      });
      console.log('✅ Email sent via Resend');
    } catch (emailErr) {
      console.error("Resend error:", emailErr);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("API route error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Helper: renders a single row in the email table
function renderRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 16px;background:#f8fafc;border-radius:8px;margin-bottom:8px;display:block;">
        <span style="display:block;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">${label}</span>
        <span style="display:block;font-size:15px;font-weight:600;color:#0D1B2A;">${value}</span>
      </td>
    </tr>
    <tr><td style="height:8px;"></td></tr>
  `;
}
