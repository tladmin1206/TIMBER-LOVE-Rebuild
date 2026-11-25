import PhotoCard from '@/components/ui/PhotoCard';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { pathways } from '@/lib/site';

/**
 * "Also considering?" routing module.
 *
 * Each pathway page was previously a silo: someone on /sell-for-cash who
 * realised they would rather remodel had no route to /design-and-build. That
 * left the strongest commercial argument: one team across every stage of a
 * home: unmade on exactly the pages where it matters.
 *
 * Pass the two pathway keys most adjacent to the current page.
 */
export default function CrossPathways({
  keys,
  eyebrow = 'Also Considering?',
  title = 'One team, a few ways to help',
  lede = 'Plenty of people arrive for one thing and leave having found another. If either of these is closer to what you need, start there instead.',
}: {
  keys: string[];
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  const items = keys
    .map((k) => pathways.find((p) => p.key === k))
    .filter((p): p is (typeof pathways)[number] => Boolean(p));

  if (!items.length) return null;

  return (
    <section className="bg-bg-primary section-tight border-t border-border-subtle" aria-labelledby="cross-heading">
      <div className="container-wide">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="cross-heading" className="h-section mt-4">
            {title}
          </h2>
          <p className="text-lead mt-5">{lede}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((p, i) => (
            <div key={p.key} className="min-w-0">
              <Reveal delay={i * 90} className="h-full">
                <Link
                  href={p.href}
                  {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group block h-full"
                >
                  <PhotoCard image={p.image} className="transition-colors group-hover:border-cream/50">
                  <h3 className="h-card">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs uppercase tracking-[0.16em] text-cream">
                    {p.cta}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                    {p.external && <span className="sr-only"> (opens affiliated site in a new tab)</span>}
                  </span>
                  </PhotoCard>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
