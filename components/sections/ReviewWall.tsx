import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Stars from '@/components/ui/Stars';
import type { Testimonial } from '@/lib/content/types';
import { googleReviews } from '@/lib/content/home';

/**
 * Premium social-proof section. Shows the aggregate Google rating plus a wall of
 * real, attributed client reviews. On desktop it is a grid; on mobile it becomes
 * a horizontal swipe carousel (scroll-snap) so proof stays scannable and
 * engaging on touch devices.
 */
export default function ReviewWall({
  reviews,
  heading = 'What Our Clients Say',
  eyebrow = 'Client Stories',
  background = 'bg-bg-secondary',
  moreHref,
}: {
  reviews: Testimonial[];
  heading?: string;
  eyebrow?: string;
  background?: string;
  /** When set, shows a "Read all reviews" link (e.g. to the dedicated /reviews/ page). */
  moreHref?: string;
}) {
  return (
    <section className={`${background} section`} aria-labelledby="reviews-heading">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="reviews-heading" className="h-section mt-4">{heading}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-3xl text-cream">{googleReviews.rating.toFixed(1)}</span>
                <Stars rating={googleReviews.rating} size="md" />
              </div>
              <a
                href={googleReviews.url}
                target="_blank"
                rel="noopener noreferrer"
                data-track="reviews_google"
                className="mt-1 inline-block text-xs uppercase tracking-[0.14em] text-text-secondary link-underline"
              >
                {googleReviews.count}+ Google reviews ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Desktop grid / mobile swipe carousel */}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              as="figure"
              delay={i * 60}
              className="min-w-[82%] shrink-0 snap-start surface-card p-6 sm:min-w-0"
            >
              <div className="flex items-center justify-between">
                <Stars rating={5} size="sm" />
                <span className="text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">Google</span>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-text-secondary">“{r.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border-subtle pt-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-sm text-accent">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm text-cream">{r.name}</span>
                  <span className="block text-xs uppercase tracking-[0.12em] text-text-muted">{r.role}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        {moreHref && (
          <div className="mt-10">
            <Link href={moreHref} className="btn-secondary" data-track="reviews_all">Read All Reviews</Link>
          </div>
        )}
      </div>
    </section>
  );
}
