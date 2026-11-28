import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://xgadpsudjrlgrvhofqkd.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnYWRwc3VkanJsZ3J2aG9mcWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MzM4MDIsImV4cCI6MjA5MDMwOTgwMn0.ZkjHb1XNa7Svt_sngzVT_uG7KFshoNAOpVV_D-xWJTA';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

function getServerSupabase() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_ANON_KEY;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

function cleanOptionalText(value: unknown, maxLen = 255): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const guideSlug = cleanOptionalText(body?.guide_slug, 120);
    const email = cleanOptionalText(body?.email, 255)?.toLowerCase() ?? '';
    const rawPhone = cleanOptionalText(body?.phone, 40) ?? '';
    const phone = rawPhone.replace(/[\s\-()]/g, '');

    // Phone is optional (email-only guides), but must be valid when sent.
    if (
      !guideSlug ||
      !EMAIL_REGEX.test(email) ||
      (phone !== '' && !PHONE_REGEX.test(phone))
    ) {
      return NextResponse.json(
        { ok: false, error: 'Invalid guide_slug, phone, or email' },
        { status: 400 }
      );
    }

    const utmSource = cleanOptionalText(body?.utm_source, 120);
    const utmMedium = cleanOptionalText(body?.utm_medium, 120);
    const utmCampaign = cleanOptionalText(body?.utm_campaign, 120);
    const referrer = cleanOptionalText(body?.referrer, 500);

    const supabase = getServerSupabase();
    const row = {
      guide_slug: guideSlug,
      phone: phone || null,
      email,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      referrer,
    };
    let { error } = await supabase.from('lead_magnet_leads').insert([row]);

    // Email-only lead while the phone column is still NOT NULL: store ''.
    if (error?.code === '23502' && row.phone === null) {
      ({ error } = await supabase
        .from('lead_magnet_leads')
        .insert([{ ...row, phone: '' }]));
    }

    if (error) {
      console.error('Failed to insert into lead_magnet_leads:', error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/lead-magnets:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
