import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )
  : null;

export async function POST(req: NextRequest) {
  try {
    let name = '';
    let email = '';
    let phone = '';
    let position = '';
    let file: File | null = null;
    let resumeUrl = '';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      name = (formData.get('name') as string) || '';
      email = (formData.get('email') as string) || '';
      phone = (formData.get('phone') as string) || '';
      position = (formData.get('position') as string) || '';
      file = (formData.get('resume') as File) || (formData.get('resumeFile') as File) || null;
      resumeUrl = (formData.get('resumeUrl') as string) || '';
    } else {
      const body = await req.json();
      name = body.name || '';
      email = body.email || '';
      phone = body.phone || '';
      position = body.position || '';
      resumeUrl = body.resumeUrl || '';
    }

    if (!name || !email || !position) {
      return NextResponse.json({ error: 'Missing required fields (name, email, position)' }, { status: 400 });
    }

    let fileBuffer: Buffer | null = null;
    let fileName = '';
    let publicFileUrl = resumeUrl;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      fileBuffer = Buffer.from(bytes);

      // Clean filename
      const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase() || '.pdf';
      fileName = `${cleanName}-${Date.now()}${ext}`;

      // 1. Save locally to public/uploads/resumes
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, fileBuffer);
        publicFileUrl = `/api/uploads/resumes/${fileName}`;
      } catch (fsErr) {
        console.warn('⚠️ FS save error:', fsErr);
      }

      // 2. Upload to Supabase Storage if configured
      if (supabaseAdmin) {
        try {
          const { error: storageError } = await supabaseAdmin.storage
            .from('media')
            .upload(`resumes/${fileName}`, fileBuffer, {
              contentType: file.type || 'application/pdf',
              upsert: true,
            });

          if (!storageError) {
            const { data } = supabaseAdmin.storage.from('media').getPublicUrl(`resumes/${fileName}`);
            if (data?.publicUrl) {
              publicFileUrl = data.publicUrl;
            }
          }
        } catch (sErr) {
          console.warn('⚠️ Supabase upload skipped/failed:', sErr);
        }
      }
    }

    // Determine domain host for absolute URLs in email
    const origin = req.headers.get('origin') || req.nextUrl?.origin || 'https://pentacloud.in';
    
    // Construct final interactive viewer link
    const viewerUrl = `${origin}/resumes/${fileName || 'view'}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&position=${encodeURIComponent(position)}&file=${encodeURIComponent(publicFileUrl || '')}`;

    const payload = {
      id: crypto.randomUUID(),
      name,
      email,
      phone: phone || null,
      position,
      resume_url: viewerUrl,
      file_url: publicFileUrl,
      file_name: fileName || file?.name || 'Resume.pdf',
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Prepare Resend Email
    const recipientEmail = process.env.CONTACT_EMAIL_TO || process.env.ADMIN_NOTIFY_EMAIL || "contactus@pentacloudconsulting.com";

    const emailAttachments = fileBuffer && file ? [
      {
        filename: file.name || fileName,
        content: fileBuffer,
      }
    ] : undefined;

    await resend.emails.send({
      from: `Pentacloud Careers <onboarding@resend.dev>`,
      to: recipientEmail,
      replyTo: email,
      subject: `💼 New Job Application: ${name} — ${position}`,
      attachments: emailAttachments,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;color:#0D1B2A;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:16px;background-color:#ffffff;">
          <div style="border-bottom:2px solid #1A7FD4;padding-bottom:16px;margin-bottom:24px;">
            <h2 style="color:#1A7FD4;margin:0;font-size:22px;">💼 New Career Application</h2>
            <p style="color:#4A6080;margin:4px 0 0 0;font-size:13px;">Pentacloud Consulting India & Global</p>
          </div>
          
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:8px 0;color:#4A6080;width:140px;"><strong>Applicant Name:</strong></td>
              <td style="padding:8px 0;color:#0D1B2A;font-weight:bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#4A6080;"><strong>Position Applied:</strong></td>
              <td style="padding:8px 0;color:#1A7FD4;font-weight:bold;">${position}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#4A6080;"><strong>Email Address:</strong></td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#1A7FD4;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#4A6080;"><strong>Phone Number:</strong></td>
              <td style="padding:8px 0;color:#0D1B2A;">${phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#4A6080;"><strong>Resume File:</strong></td>
              <td style="padding:8px 0;color:#059669;font-weight:bold;">${file ? 'Attached to Email & Hosted Online' : 'Uploaded'}</td>
            </tr>
          </table>

          <div style="margin-top:28px;padding:20px;background-color:#F4F7FB;border-radius:12px;text-align:center;">
            <a href="${viewerUrl}" target="_blank" style="display:inline-block;padding:12px 24px;background-color:#1A7FD4;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;border-radius:8px;box-shadow:0 4px 12px rgba(26,127,212,0.3);">
              📄 Open Interactive Resume & Candidate View
            </a>
            <p style="margin:12px 0 0 0;font-size:11px;color:#64748b;">
              You can also open or download the attached file directly from this email.
            </p>
          </div>

          <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e2e8f0;text-align:center;font-size:11px;color:#94a3b8;">
            Pentacloud Consulting &bull; Recruitment Portal Confidential Communication
          </div>
        </div>
      `
    });

    console.log('✅ Career email & resume successfully processed via Resend');
    return NextResponse.json({ success: true, application: payload }, { status: 200 });

  } catch (err: any) {
    console.error('API route error in submit-career:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
