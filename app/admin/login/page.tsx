'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin/estimator';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.replace(next);
        router.refresh();
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j.error || 'Invalid credentials.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  }

  const inp = 'w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none';

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-6 text-neutral-900">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold">Admin sign in</h1>
        <p className="mt-1 text-sm text-neutral-500">Timber + Love · Investment Planner</p>
        <div className="mt-6 space-y-3">
          <label className="block text-xs font-medium text-neutral-600">
            Email
            <input className={`mt-1 ${inp}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </label>
          <label className="block text-xs font-medium text-neutral-600">
            Password
            <input className={`mt-1 ${inp}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          </label>
        </div>
        {error && <p className="mt-3 rounded bg-red-50 p-2 text-xs text-red-700">{error}</p>}
        <button type="submit" disabled={busy || !password} className="mt-6 w-full rounded bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
