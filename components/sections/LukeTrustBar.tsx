import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

/**
 * Reusable Luke Caldwell trust bar.
 *
 * A compact authority module that can drop onto any page: Luke's photo, his
 * credential, a one-line bio, his social links, a route to his story, and the
 * primary "Contact Luke's Team" action. Only real, established facts and links
 * are used (the Timber and Love socials Luke fronts; no invented handles).
 */

const LUKE_IMAGE = '/editorial/luke-current.webp';

export default function LukeTrustBar({ className = '' }: { className?: string }) {
  return (
    <section aria-labelledby="luke-heading" className={`section-tonal bg-bg-secondary ${className}`}>
      <div className="container-wide section-tight">
        <Reveal className="grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LUKE_IMAGE}
            width={1060}
            height={1400}
            alt="Luke Caldwell of Timber and Love"
            loading="lazy"
            className="h-auto w-28 shrink-0 sm:w-32"
          />
          <div>
            <p className="eyebrow">HGTV&apos;s Boise Boys &middot; Founder</p>
            <h2 id="luke-heading" className="h-card mt-2 text-cream">
              Led by Luke Caldwell
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
              Luke leads design at Timber and Love, the same warm, modern sensibility behind his book Americana Soul and
              HGTV&apos;s Boise Boys and Outgrown. Every project is designed and built by his team, here in the Treasure
              Valley.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/about/" className="link-underline text-sm text-cream" data-track="luke_story">
                Read Luke&apos;s Story
              </Link>
              <div className="flex gap-4 text-xs uppercase tracking-[0.16em]">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Instagram</a>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Facebook</a>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/contact/" className="btn-primary" data-track="luke_contact_team">
                Contact Luke&apos;s Team
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
