import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/leads/email';

export const runtime = 'nodejs';

/** A successful response means the mail provider accepted the inquiry. Logs
 * are not a lead inbox and must never be treated as a successful delivery. */
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
  const name = `${lead.firstName} ${lead.lastName}`.trim();
  const idempotencyKey = /^[a-f0-9-]{36}$/i.test(lead.submissionId) ? `contact/${lead.submissionId}` : undefined;
  const delivery = await sendLeadEmail({
    subject: `Website inquiry: ${name.replace(/[\r\n]/g, ' ')}`,
    replyTo: lead.email,
    idempotencyKey,
    text: [
      `Name: ${name}`, `Email: ${lead.email}`, `Phone: ${lead.phone || 'Not provided'}`,
      `Interest: ${lead.service || 'General inquiry'}`, `Source: ${lead.source || 'website'}`,
      `Page: ${lead.page || 'Not provided'}`, '', lead.message,
    ].join('\n'),
  });
  if (!delivery.delivered) {
    // Do not log private contact details or pretend a console entry is capture.
    console.error('[CONTACT_DELIVERY_FAILED]', { reason: delivery.reason, attempts: delivery.attempts });
    return NextResponse.json({ ok: false, error: 'Your inquiry could not be sent right now. Please try again or contact our team directly.' }, { status: 503, headers: { 'Retry-After': '30' } });
  }
  console.info('[CONTACT_PROVIDER_ACCEPTED]', { providerId: delivery.id ?? null });
  return NextResponse.json({ ok: true });
}
