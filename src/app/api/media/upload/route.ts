import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role key to bypass any RLS issues on storage
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const focusKeyword = formData.get('focusKeyword') as string | null;
    const suffix = formData.get('suffix') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build a clean filename
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    
    let slug = '';
    if (focusKeyword) {
      slug = focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (suffix) {
        const cleanSuffix = suffix.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        slug += `-${cleanSuffix}`;
      }
    } else {
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
      slug = nameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    const finalFileName = `${slug}-${Date.now()}.${ext}`;

    // 1. Upload file to Supabase Storage bucket "media"
    const { error: storageError } = await supabaseAdmin.storage
      .from('media')
      .upload(finalFileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (storageError) {
      console.error('❌ Supabase Storage upload failed:', storageError.message);
      return NextResponse.json({ error: `Storage upload failed: ${storageError.message}` }, { status: 500 });
    }

    // 2. Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage.from('media').getPublicUrl(finalFileName);
    const publicUrl = publicUrlData.publicUrl;

    // 3. Insert metadata into the `media` table
    const { error: dbError } = await supabaseAdmin.from('media').insert({
      filename: finalFileName,
      url: publicUrl,
      alt_text: '',
      uploaded_at: new Date().toISOString(),
    });

    if (dbError) {
      console.warn('⚠️ File uploaded to storage but failed to save metadata to media table:', dbError.message);
      // Don't fail — file is still accessible via URL
    }

    console.log('✅ File uploaded to Supabase Storage and media table:', finalFileName);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFileName,
      isSupabase: true,
    });

  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
