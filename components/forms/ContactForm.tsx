'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Spinner from '@/components/ui/Spinner';
import { site } from '@/lib/site';

const PHONE = site.phone;
const PHONE_HREF = site.phoneHref;

type Props = {
  /** Hidden field so we know which form/popup the lead came from */
  source?: string;
  compact?: boolean;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ source = 'website', compact = false }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const successRef = useRef<HTMLDivElement | null>(null);

  // Move focus to the confirmation so keyboard and screen-reader users are told
  // the send succeeded: otherwise the only signal is a visual swap they miss.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError(`Your message did not send. Please try again, or reach us directly at ${PHONE} or ${site.email}.`);
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="py-10 text-center focus:outline-none"
      >
        <p className="h-card text-cream">Message Sent</p>
        <p className="mt-4 text-body">
          A member of our team reads every inquiry personally. Expect a reply within one business day.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Need something sooner? Call{' '}
          <a href={PHONE_HREF} className="link-underline text-cream">
            {PHONE}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/timber-and-love-gallery/" className="btn-secondary">
            View Our Work
          </Link>
        </div>
      </div>
    );
  }

  const inputCls =
    'w-full border border-cream/25 bg-transparent px-4 py-3 text-cream placeholder-cream/50 outline-none transition focus:border-cream/70';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2'}>
        <input className={inputCls} name="firstName" placeholder="First Name" aria-label="First name" required autoComplete="given-name" />
        <input className={inputCls} name="lastName" placeholder="Last Name" aria-label="Last name" required autoComplete="family-name" />
      </div>
      <input className={inputCls} type="email" name="email" placeholder="Email" aria-label="Email address" required autoComplete="email" />
      <input className={inputCls} type="tel" name="phone" placeholder="Phone" aria-label="Phone number" autoComplete="tel" />
      <textarea
        className={inputCls}
        name="message"
        rows={4}
        aria-label="How can we help?"
        placeholder="Please let us know how we can help (e.g., home remodel, new build, buying, selling, a cash offer, investing, or a vacation stay)."
      />
      <input type="hidden" name="source" value={source} />
      {/* Honeypot for spam bots */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {status === 'error' && <p className="field-error" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
        className="btn-primary w-full"
      >
        {status === 'submitting' && <Spinner />}
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
