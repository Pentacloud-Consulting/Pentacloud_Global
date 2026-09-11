import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SITE_URL = 'https://pentacloud.in/';

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY in .env.local');
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '30');
  const type = searchParams.get('type') || 'all'; // 'traffic' | 'queries' | 'all' | 'ping'

  // --- Ping / credential check endpoint ---
  if (type === 'ping') {
    try {
      const auth = getAuth();
      const searchconsole = google.searchconsole({ version: 'v1', auth });
      // Verify credentials by listing sites
      const sites = await searchconsole.sites.list();
      const siteList = sites.data.siteEntry?.map(s => s.siteUrl) || [];
      const isVerified = siteList.some(url => url?.includes('pentacloud.in'));
      return NextResponse.json({
        ok: true,
        credentialsValid: true,
        sites: siteList,
        siteVerified: isVerified,
        message: isVerified
          ? '✅ Connected! pentacloud.in is verified in your GSC account.'
          : `⚠️ Credentials valid but pentacloud.in not found. Available sites: ${siteList.join(', ') || 'none'}. Add the service account as a GSC user.`
      });
    } catch (err: any) {
      return NextResponse.json({ ok: false, credentialsValid: false, error: err.message }, { status: 401 });
    }
  }

  // --- Main data fetch ---
  try {
    const auth = getAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const today = new Date();
    const startDateObj = new Date();
    startDateObj.setDate(today.getDate() - days);
    const startDate = startDateObj.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    let traffic: any[] = [];
    let queries: any[] = [];
    let pages: any[] = [];

    // 1. Traffic over time (for the chart)
    if (type === 'all' || type === 'traffic') {
      try {
        const trafficResponse = await searchconsole.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['date'],
            rowLimit: days,
          },
        });
        traffic = (trafficResponse.data.rows || []).map(row => ({
          label: new Date(row.keys![0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          date: row.keys![0],
          value: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: Math.round((row.ctr || 0) * 1000) / 10, // as percentage
          position: Math.round((row.position || 0) * 10) / 10,
        }));
      } catch (err: any) {
        console.error('GSC traffic fetch error:', err.message);
      }
    }

    // 2. Top queries/keywords
    if (type === 'all' || type === 'queries') {
      try {
        const queriesResponse = await searchconsole.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['query'],
            rowLimit: 150,
            dimensionFilterGroups: [],
          },
        });
        queries = (queriesResponse.data.rows || []).map(row => ({
          keys: row.keys,
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: Math.round((row.ctr || 0) * 1000) / 10,
          position: Math.round((row.position || 0) * 10) / 10,
        }));
      } catch (err: any) {
        console.error('GSC queries fetch error:', err.message);
      }
    }

    // 3. Top pages
    if (type === 'all') {
      try {
        const pagesResponse = await searchconsole.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['page'],
            rowLimit: 50,
          },
        });
        pages = (pagesResponse.data.rows || []).map(row => ({
          page: row.keys![0],
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: Math.round((row.ctr || 0) * 1000) / 10,
          position: Math.round((row.position || 0) * 10) / 10,
        }));
      } catch (err: any) {
        console.error('GSC pages fetch error:', err.message);
      }
    }

    // Summary totals
    const totalClicks = traffic.reduce((s, r) => s + r.value, 0);
    const totalImpressions = traffic.reduce((s, r) => s + r.impressions, 0);
    const avgPosition = queries.length > 0
      ? Math.round((queries.reduce((s, r) => s + r.position, 0) / queries.length) * 10) / 10
      : 0;

    return NextResponse.json({
      success: true,
      dateRange: { startDate, endDate, days },
      summary: { totalClicks, totalImpressions, avgPosition, totalKeywords: queries.length },
      traffic,
      queries,
      pages,
    });
  } catch (error: any) {
    console.error('GSC API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      hint: 'Check that your service account has been added to Google Search Console as a user for pentacloud.in'
    }, { status: 500 });
  }
}
