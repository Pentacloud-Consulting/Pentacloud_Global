import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service } = body;

    if (!name || !email || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payload = {
      id: crypto.randomUUID(),
      name,
      email,
      phone: phone || null,
      message: company ? `Company: ${company}\nService: ${service}` : `Service: ${service}`,
      source_page: 'Contact Us Page',
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Send Email via Resend
    const recipientEmail = process.env.CONTACT_EMAIL_TO || process.env.ADMIN_NOTIFY_EMAIL || "contactus@pentacloudconsulting.com";
    
    await resend.emails.send({
      from: `Pentacloud Website <onboarding@resend.dev>`,
      to: recipientEmail,
      replyTo: email,
      subject: `📩 New Enquiry from ${name} — ${service}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#333;padding:20px;">
          <h2>📬 New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Service:</strong> ${service}</p>
        </div>
      `
    });

    console.log('✅ Email successfully sent via Resend');
    return NextResponse.json({ success: true, lead: payload }, { status: 200 });

  } catch (err: any) {
    console.error('API route error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

