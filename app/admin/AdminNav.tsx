'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

/** Internal admin header: section links + sign out. */
export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`rounded px-3 py-1.5 text-sm ${pathname === href ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-200'}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="mb-6 flex items-center gap-2 border-b border-neutral-200 pb-4">
      <span className="mr-2 text-sm font-semibold text-neutral-900">T+L Admin</span>
      {link('/admin/estimator', 'Estimator')}
      {link('/admin/estimates', 'Stored estimates')}
      <button onClick={signOut} className="ml-auto rounded px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-200">
        Sign out
      </button>
    </nav>
  );
}
