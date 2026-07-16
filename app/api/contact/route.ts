import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Lead = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  company_website?: string; // honeypot
};

/**
 * Lead intake endpoint. Validates and logs the submission.
 *
 * To deliver leads by email, set these env vars in Replit Secrets and the
 * handler will forward via Resend (https://resend.com) — otherwise it just
 * records the lead to the server log so nothing is lost:
 *   RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL
 */
export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: silently accept bots without doing anything.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const firstName = (body.firstName || '').trim();
  const email = (body.email || '').trim();
  if (!firstName || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Name and a valid email are required.' }, { status: 422 });
  }

  const lead = {
    name: `${firstName} ${(body.lastName || '').trim()}`.trim(),
    email,
    phone: (body.phone || '').trim(),
    message: (body.message || '').trim(),
    source: (body.source || 'website').trim(),
    receivedAt: new Date().toISOString(),
  };

  // Always record server-side so a lead is never lost.
  console.log('[lead]', JSON.stringify(lead));

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (apiKey && to && from) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          reply_to: lead.email,
          subject: `New website lead (${lead.source}) — ${lead.name}`,
          text: `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nSource: ${lead.source}\n\n${lead.message}`,
        }),
      });
    } catch (err) {
      console.error('[lead] email forward failed', err);
      // Still return ok — the lead is logged and the user shouldn't see a failure.
    }
  }

  return NextResponse.json({ ok: true });
}
