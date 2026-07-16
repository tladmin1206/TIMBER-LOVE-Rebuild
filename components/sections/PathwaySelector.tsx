import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { pathways, type Pathway } from '@/lib/site';

/**
 * The service pathway selector — the primary way visitors self-select into a
 * focused, conversion-oriented experience. Each pathway is one large, clearly
 * labeled card: strong imagery, one sentence, a descriptive CTA, and an
 * entire-card click target with visible hover and keyboard focus states.
 *
 * The grid is intentionally asymmetric — Design + Build (the primary internal
 * service) is given slightly more room without minimizing the others.
 */
function PathwayCard({ pathway, featured = false }: { pathway: Pathway; featured?: boolean }) {
  return (
    <div
      className={`group card-interactive relative isolate flex min-h-[16rem] flex-col justify-end overflow-hidden ${
        featured ? 'lg:col-span-2 lg:row-span-2 lg:min-h-full' : ''
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pathway.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />

      <div className={`p-6 ${featured ? 'sm:p-9' : 'sm:p-7'}`}>
        <h3 className={`h-display text-text-primary ${featured ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
          {pathway.title}
        </h3>
        <p className={`mt-3 text-text-secondary ${featured ? 'max-w-md text-base' : 'text-sm'}`}>{pathway.blurb}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-accent">
          {pathway.cta}
          {pathway.external && <span aria-hidden="true">↗</span>}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>

      {/* Entire-card click target with an accessible label. */}
      <Link
        href={pathway.href}
        {...(pathway.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        data-track={`pathway_${pathway.key}`}
        className="absolute inset-0 z-10 rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-focus"
        aria-label={`${pathway.title} — ${pathway.cta}${pathway.external ? ' (opens affiliated site)' : ''}`}
      >
        <span className="sr-only">{pathway.blurb}</span>
      </Link>
    </div>
  );
}

export default function PathwaySelector() {
  const [featured, ...rest] = pathways;
  return (
    <section id="pathways" className="bg-bg-primary py-20 sm:py-28" aria-labelledby="pathways-heading">
      <div className="container-wide">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Find the Right Service</p>
          <h2 id="pathways-heading" className="h-display mt-4 text-3xl sm:text-5xl">
            What Can We Help You Do?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,1fr)]">
          <PathwayCard pathway={featured} featured />
          {rest.map((p) => (
            <PathwayCard key={p.key} pathway={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
