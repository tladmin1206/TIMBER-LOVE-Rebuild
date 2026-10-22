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
    <section aria-labelledby="luke-heading" className={`bg-ink ${className}`}>
      <div className="container-wide section-tight">
        <Reveal className="mx-auto grid max-w-5xl items-center gap-10 text-center md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:gap-14 md:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LUKE_IMAGE}
            width={1060}
            height={1400}
            alt="Luke Caldwell of Timber + Love"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-[280px] md:max-w-[360px]"
          />
          <div>
            <p className="eyebrow">HGTV&apos;s Boise Boys &middot; Founder</p>
            <h2 id="luke-heading" className="h-section mt-4 text-cream">
              Led by Luke Caldwell
            </h2>
            <p className="mt-5 text-lead">
              Luke leads design at Timber + Love, the same warm, modern sensibility behind his book Americana Soul and
              HGTV&apos;s Boise Boys and Outgrown. Every project is designed and built by his team, here in the Treasure
              Valley.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
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
