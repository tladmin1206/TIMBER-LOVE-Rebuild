'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Spinner from '@/components/ui/Spinner';
import { trackEvent } from '@/lib/analytics';
import { trackQuestionnaireStart, trackQuestionnaireSubmit } from '@/lib/questionnaireAnalytics';
import { site } from '@/lib/site';

type Props = { source?: string; compact?: boolean; defaultService?: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
declare global { interface Window { turnstile?: { reset: (el?: string | HTMLElement) => void } } }
const SERVICES = ['Design + Build', 'Buying or Selling', 'Cash Home Offer', 'Investing', 'Vacation Stay', 'Press or Partnership', 'Something Else'];

export default function ContactForm({ source = 'website', compact = false, defaultService = '' }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const id = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  const started = useRef(false);
  const submission = useRef({ payload: '', id: '' });

  useEffect(() => { if (status === 'success') successRef.current?.focus(); }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    sending.current = true;
    setStatus('submitting');
    setError('');
    const { 'cf-turnstile-response': turnstileToken, ...fields } = Object.fromEntries(new FormData(form).entries());
    // Keep the same key on retries so an interrupted response cannot create
    // duplicate email notifications. A changed inquiry gets a new key.
    const payload = JSON.stringify({ ...fields, source, page: window.location.pathname });
    if (submission.current.payload !== payload) submission.current = { payload, id: crypto.randomUUID() };
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...JSON.parse(payload), submissionId: submission.current.id, ...(turnstileToken ? { 'cf-turnstile-response': turnstileToken } : {}) }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await res.json();
      if (!res.ok || result.ok !== true) throw new Error(result.error || 'That didn\'t go through. Try again, or call us.');
      trackEvent('generate_lead', { form: 'general_contact', source });
      trackQuestionnaireSubmit('general_contact');
      setStatus('success');
      form.reset();
    } catch (err) {
      trackEvent('form_error', { form: 'general_contact', source, reason: 'delivery_unconfirmed' });
      setStatus('error');
      // A Turnstile token is single use; get a fresh one for the retry.
      if (TURNSTILE_SITE_KEY) window.turnstile?.reset();
      setError(err instanceof Error && err.name !== 'TimeoutError' && err.name !== 'TypeError' ? err.message : 'That didn\'t go through. Try again, or call us.');
    } finally {
      sending.current = false;
    }
  }

  if (status === 'success') return (
    <div ref={successRef} role="status" tabIndex={-1} className="py-10 text-center focus:outline-none">
      <p className="h-card text-cream">Got it, thanks.</p>
      <p className="mt-4 text-body">Someone on our team will read this and write back.</p>
      <p className="mt-4 text-sm text-text-muted">Prefer to talk? <a href={site.phoneHref} className="link-underline text-cream">{site.phone}</a></p>
      <Link href="/timber-and-love-gallery/" className="btn-secondary mt-8">See the Houses</Link>
    </div>
  );

  const inputCls = 'mt-2 w-full min-w-0 border border-cream/25 bg-ink px-4 py-3 text-base text-cream outline-none transition focus:border-cream/70';
  return (
    <form onFocus={() => { if (!started.current) { started.current = true; trackEvent('form_start', { form: 'general_contact', source }); } trackQuestionnaireStart('general_contact'); }} onSubmit={handleSubmit} className="space-y-5" aria-label="Contact Timber + Love">
      <p className="text-xs text-text-muted">Fields marked * are required.</p>
      <div className={compact ? 'space-y-5' : 'grid gap-5 sm:grid-cols-2'}>
        <label className="block text-sm text-cream" htmlFor={`${id}-first`}>First Name *<input id={`${id}-first`} className={inputCls} name="firstName" required maxLength={100} autoComplete="given-name" /></label>
        <label className="block text-sm text-cream" htmlFor={`${id}-last`}>Last Name<input id={`${id}-last`} className={inputCls} name="lastName" maxLength={100} autoComplete="family-name" /></label>
      </div>
      <div className={compact ? 'space-y-5' : 'grid gap-5 sm:grid-cols-2'}>
        <label className="block text-sm text-cream" htmlFor={`${id}-email`}>Email *<input id={`${id}-email`} className={inputCls} type="email" name="email" required maxLength={254} autoComplete="email" /></label>
        <label className="block text-sm text-cream" htmlFor={`${id}-phone`}>Phone<input id={`${id}-phone`} className={inputCls} type="tel" name="phone" maxLength={40} autoComplete="tel" /></label>
      </div>
      <label className="block text-sm text-cream" htmlFor={`${id}-service`}>I’m Interested In
        <select id={`${id}-service`} name="service" defaultValue={defaultService} className={inputCls}>
          <option value="">Select an option (optional)</option>
          {SERVICES.map(s => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="block text-sm text-cream" htmlFor={`${id}-message`}>How Can We Help? *
        <textarea id={`${id}-message`} className={`${inputCls} resize-y placeholder:text-cream/45`} name="message" rows={4} required maxLength={5000} placeholder="Tell us about the house, what's bothering you about it and what you'd like it to feel like when it's done." />
      </label>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" data-size="flexible" />
        </>
      )}
      {status === 'error' && <div className="field-error space-y-2" role="alert"><p>{error}</p><p>Or call us at <a className="link-underline" href={site.phoneHref}>{site.phone}</a> or email <a className="link-underline break-all" href={`mailto:${site.email}`}>{site.email}</a>.</p></div>}
      <p className="text-xs leading-relaxed text-text-muted">By submitting, you agree that our team may contact you about your inquiry. <Link href="/privacy-policy/" className="link-underline">Privacy Policy</Link></p>
      <button type="submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
        {status === 'submitting' && <Spinner />}{status === 'submitting' ? 'Sending…' : 'Send Note'}
      </button>
    </form>
  );
}
