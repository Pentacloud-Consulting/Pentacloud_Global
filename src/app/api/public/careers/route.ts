import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const resume = formData.get('resume') as File;

    if (!name || !email || !resume) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email notification if Resend is configured
    if (resend && process.env.ADMIN_NOTIFY_EMAIL) {
      await resend.emails.send({
        from: 'Pentacloud Careers <onboarding@resend.dev>',
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: `New Career Application: ${name} for ${position || 'General'}`,
        html: `
          <h2>New Application Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Position:</strong> ${position || 'General Application'}</p>
        `
      }).catch(err => console.error('Email send warning:', err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
