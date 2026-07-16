'use client';

import { useState } from 'react';

type Props = {
  /** Hidden field so we know which form/popup the lead came from */
  source?: string;
  compact?: boolean;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ source = 'website', compact = false }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong. Please call us at (208) 995-9516 or email connect@timberandlove.com.');
    }
  }

  if (status === 'success') {
    return (
      <div className="py-10 text-center">
        <p className="text-2xl text-cream uppercase tracking-brand">Thank you!</p>
        <p className="mt-3 text-body">
          We&apos;ve received your message and a member of our team will reach out shortly.
        </p>
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
      {status === 'error' && <p className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={status === 'submitting'} className="btn-solid w-full disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
