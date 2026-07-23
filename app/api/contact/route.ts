import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/leads/email';

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
 * handler will forward via Resend (https://resend.com): otherwise it just
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

  // Delivery is checked rather than assumed. A failure here is logged with a
  // distinctive marker, but the response stays ok: the lead is recorded, and a
  // homeowner should never see our mail provider's problem.
  const delivery = await sendLeadEmail({
    subject: `New website lead (${lead.source}): ${lead.name}`,
    replyTo: lead.email,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone || '-'}`,
      `Source: ${lead.source}`,
      `Received: ${lead.receivedAt}`,
      '',
      lead.message || '(no message)',
    ].join('\n'),
  });

  if (!delivery.delivered && delivery.reason !== 'not-configured') {
    console.error('[lead] NOT DELIVERED: follow up manually', { lead, delivery });
  }

  return NextResponse.json({ ok: true });
}
