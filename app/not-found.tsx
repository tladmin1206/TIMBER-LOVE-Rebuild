import Link from 'next/link';
import { pathways } from '@/lib/site';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-bg-primary py-32">
      <div className="container-tl max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="h-page mt-4">That page isn&apos;t here</h1>
        <p className="text-lead mt-5">
          It may have moved. Here&apos;s where most people head next.
        </p>
        <div className="cta-row-center mt-8">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/contact/" className="btn-secondary">Talk to Us</Link>
        </div>
        <div className="mt-12 border-t border-border-subtle pt-8">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">See What We Do</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {pathways.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="border border-border-subtle px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
