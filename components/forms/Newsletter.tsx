'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string)?.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('err');
      return;
    }
    setStatus('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'Subscriber', email, source: 'newsletter', message: 'Newsletter signup' }),
      });
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return <p className="text-sm text-cream/80">Thanks — you&apos;re on the list. Watch your inbox for T+L updates.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        aria-label="Your email"
        className="w-full border border-cream/25 bg-transparent px-4 py-3 text-cream placeholder-cream/50 outline-none transition focus:border-cream/70"
      />
      <button type="submit" disabled={status === 'loading'} className="btn-solid whitespace-nowrap disabled:opacity-60">
        {status === 'loading' ? 'Joining…' : 'Get Notified'}
      </button>
      {status === 'err' && <span className="text-xs text-red-300">Please enter a valid email.</span>}
    </form>
  );
}
