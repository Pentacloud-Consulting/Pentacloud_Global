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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service_requested, message, source_page = 'Website Enquiry' } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newLead: MockLead = {
      id: Date.now().toString(),
      name, email,
      phone: phone || '',
      company: company || '',
      service_requested: service_requested || '',
      message: message || '',
      source_page,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    store.unshift(newLead);
    console.log('[MOCK] Lead saved:', newLead.name, newLead.email);
    return NextResponse.json({ success: true, data: newLead });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
