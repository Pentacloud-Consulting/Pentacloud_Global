import { NextResponse } from 'next/server';

// ─── Inline mock store (uses global to survive hot-reloads) ──────────────────
interface MockLead {
  id: string; name: string; email: string; phone?: string;
  company?: string; service_requested?: string;
  message?: string; source_page?: string; status: string; created_at: string;
}
declare global { var __mockLeads: MockLead[] | undefined; }
if (!global.__mockLeads) {
  global.__mockLeads = [{ id: '1', name: 'Sample Lead', email: 'sample@example.com', phone: '+91 99999 00000', company: 'Acme Corp', service_requested: 'Salesforce Consulting', message: '', source_page: 'Contact Us Page', status: 'new', created_at: new Date().toISOString() }];
}
const store = global.__mockLeads;

export async function GET() {
  return NextResponse.json({ data: store });
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    const lead = store.find(l => l.id === id);
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    lead.status = status;
    return NextResponse.json({ data: lead });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
