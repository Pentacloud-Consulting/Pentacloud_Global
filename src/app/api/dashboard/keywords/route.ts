import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('tracked_keywords')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error('API route error (GET /keywords):', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { keywords } = body;

    if (!keywords || !Array.isArray(keywords)) {
      return NextResponse.json({ error: 'Missing or invalid keywords array' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('tracked_keywords')
      .insert(keywords)
      .select();

    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error('API route error (POST /keywords):', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'Missing or invalid ids array' }, { status: 400 });
    }

    const { error } = await supabase
      .from('tracked_keywords')
      .delete()
      .in('id', ids);

    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('API route error (DELETE /keywords):', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
