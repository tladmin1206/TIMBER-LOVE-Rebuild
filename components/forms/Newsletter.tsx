'use client';

import { useState } from 'react';

/**
 * Footer newsletter signup.
 *
 * Deliberately stacked at every width. This sits inside a footer column that
 * becomes NARROWER as the viewport grows (one column on mobile, a quarter of
 * the container at `lg`), so a viewport-based breakpoint is the wrong signal
 * entirely, it previously flipped to a horizontal row exactly when the column
 * was at its narrowest, crushing the input to a few characters wide.
 */
export default function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string)?.trim();

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
      setStatus('err');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Subscriber',
          email,
          source: 'newsletter',
          message: 'Newsletter signup',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('err');
      setMessage('That did not go through. Please try again in a moment.');
    }
  }

  if (status === 'ok') {
    return (
      <p role="status" className="text-sm leading-relaxed text-cream/80">
        Thank you. Your request for Timber + Love updates has been sent to our team.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Your email"
        aria-invalid={status === 'err'}
        aria-describedby={status === 'err' ? 'newsletter-error' : undefined}
        // min-w-0 so the field can never be squeezed below its content by a
        // sibling, whatever container it is dropped into.
        className="w-full min-w-0 border border-border-subtle bg-transparent px-4 py-3 text-cream placeholder:text-text-muted outline-none transition-colors focus:border-cream/70"
      />
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
        {status === 'loading' ? 'Joining…' : 'Get Notified'}
      </button>
      {status === 'err' && (
        <p id="newsletter-error" role="alert" className="field-error">
          {message}
        </p>
      )}
    </form>
  );
}
