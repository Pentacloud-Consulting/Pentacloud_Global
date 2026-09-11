import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Service role bypasses any RLS or permission issues
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isValidUUID = (id: any) => typeof id === 'string' && UUID_REGEX.test(id);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogData, id, status } = body;

    const updatedStatus = status || blogData.status || 'draft';
    const payload = {
      ...blogData,
      status: updatedStatus,
      updated_at: new Date().toISOString(),
    };

    // Remove fields that don't belong in the DB row
    delete payload._last_saved;
    delete payload.location;   // UI-only field, not a DB column
    delete payload.seoScore;   // computed field, not stored

    // Only use as targetId if it's a real Supabase UUID — ignore fake timestamp IDs
    const targetId = isValidUUID(id) ? id : (isValidUUID(blogData.id) ? blogData.id : null);

    if (!targetId) {
      // New blog — INSERT
      delete payload.id; // Let Supabase generate UUID
      if (updatedStatus === 'published' && !payload.published_at) {
        payload.published_at = new Date().toISOString();
      }

      const { data, error } = await supabaseAdmin
        .from('blogs')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase insert error:', error);
        return NextResponse.json({ error: error.message, details: error }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    } else {
      // Existing blog — UPDATE
      if (updatedStatus === 'published' && !payload.published_at) {
        payload.published_at = new Date().toISOString();
      }

      // Auto-stamp last_modified_date on every update (dd-mm-yyyy)
      if (!payload.last_modified_date) {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        payload.last_modified_date = `${dd}-${mm}-${yyyy}`;
      }

      const { data, error } = await supabaseAdmin
        .from('blogs')
        .update(payload)
        .eq('id', targetId)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase update error:', error);
        return NextResponse.json({ error: error.message, details: error }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    }
  } catch (error: any) {
    console.error('Blog Save API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
