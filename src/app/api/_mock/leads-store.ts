import { NextResponse } from 'next/server';

// ─── In-memory mock store (shared via global to survive hot-reloads) ──────────
declare global {
  // eslint-disable-next-line no-var
  var __mockLeads: MockLead[] | undefined;
}

export interface MockLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_requested?: string;
  message?: string;
  source_page?: string;
  status: string;
  created_at: string;
}

// Seed with one example so the dashboard isn't empty on first load
if (!global.__mockLeads) {
  global.__mockLeads = [
    {
      id: '1',
      name: 'Sample Lead',
      email: 'sample@example.com',
      phone: '+91 99999 00000',
      company: 'Acme Corp',
      service_requested: 'Salesforce Consulting',
      message: '',
      source_page: 'Contact Us Page',
      status: 'new',
      created_at: new Date().toISOString(),
    },
  ];
}

export const mockLeadsStore = global.__mockLeads;
