import type { Metadata } from 'next';

// Admin screens are private tools: keep them out of search and never let them
// inherit the homepage title or canonical.
export const metadata: Metadata = {
  title: { absolute: 'Admin - Timber + Love' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
