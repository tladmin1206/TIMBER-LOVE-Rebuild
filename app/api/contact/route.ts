import { NextResponse } from 'next/server';
import { captureInquiry } from '@/lib/leads/capture';

export const runtime = 'nodejs';

/**
 * A successful response means the inquiry is KEPT: written to the database,
 * accepted by the CRM, or accepted by the mail provider. Any one of those
 * outlives the request. Logs are not a lead inbox and are never treated as
 * capture.
 *
 * Success no longer requires the email specifically. When mail is down but the
 * database or CRM took the inquiry, the homeowner is told it went through,
 * because it did, and the team picks it up from `Inquiry.notified = false`.
 * Telling someone their message failed while it sits safely in the CRM makes
 * them send it twice or give up.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 12000) return NextResponse.json({ ok: false, error: 'Your message is too long.' }, { status: 413 });
    body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid payload');
  } catch {
    return NextResponse.json({ ok: false, error: 'Please check your details and try again.' }, { status: 400 });
  }
  if (typeof body.company_website === 'string' && body.company_website.trim()) return NextResponse.json({ ok: true });

  const limits: Record<string, number> = { firstName: 100, lastName: 100, email: 254, phone: 40, service: 80, message: 5000, source: 100, page: 1000, submissionId: 36 };
  const lead: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = body[key];
    if (value != null && (typeof value !== 'string' || value.length > limit)) return NextResponse.json({ ok: false, error: 'Please check your details and shorten any very long fields.' }, { status: 422 });
    lead[key] = typeof value === 'string' ? value.trim() : '';
  }
  if (!lead.firstName || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email) || !lead.message) {
    return NextResponse.json({ ok: false, error: 'Please enter your first name, a valid email, and a message.' }, { status: 422 });
  }
  const result = await captureInquiry({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    service: lead.service,
    message: lead.message,
    source: lead.source,
    page: lead.page,
    submissionId: /^[a-f0-9-]{36}$/i.test(lead.submissionId) ? lead.submissionId : undefined,
  });

  if (!result.kept) {
    // Nothing durable is configured or every channel refused. Do not log
    // private contact details, and do not pretend a console entry is capture.
    console.error('[CONTACT_CAPTURE_FAILED]', { channels: result.channels, reasons: result.reasons });
    return NextResponse.json(
      { ok: false, error: 'Your inquiry could not be sent right now. Please try again or contact our team directly.' },
      { status: 503, headers: { 'Retry-After': '30' } }
    );
  }

  if (!result.notified) {
    // Kept, but no one has been told yet. This is the line that should page
    // somebody: the lead is safe and is waiting in the recovery queue.
    console.error('[CONTACT_KEPT_NOT_NOTIFIED]', { channels: result.channels, reasons: result.reasons });
  } else {
    console.info('[CONTACT_CAPTURED]', { channels: result.channels });
  }

  return NextResponse.json({ ok: true });
}
