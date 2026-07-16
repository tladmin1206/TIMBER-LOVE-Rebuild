import Stars from '@/components/ui/Stars';
import { site } from '@/lib/site';
import { googleReviews } from '@/lib/content/home';

/**
 * Slim credibility strip shown directly under the hero. Front-loads the
 * strongest trust signals (real Google rating, HGTV, local tenure) at the
 * moment a visitor is deciding whether to keep reading. Items reveal
 * progressively as the viewport widens.
 */
export default function TrustBar() {
  const Dot = ({ at }: { at: string }) => <span aria-hidden="true" className={`${at} text-border-subtle`}>•</span>;
  return (
    <section aria-label="Trust indicators" className="border-y border-border-subtle bg-bg-secondary">
      <div className="container-wide flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-xs uppercase tracking-[0.14em] text-text-secondary">
        <a
          href={googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          data-track="trustbar_reviews"
          className="flex items-center gap-2 transition-colors hover:text-cream"
        >
          <span className="text-cream">{googleReviews.rating.toFixed(1)}</span>
          <Stars rating={googleReviews.rating} size="sm" />
          <span>{googleReviews.count}+ Google reviews</span>
        </a>
        <Dot at="hidden sm:inline" />
        <span className="hidden sm:inline">As seen on HGTV&apos;s Boise Boys</span>
        <Dot at="hidden md:inline" />
        <span className="hidden md:inline">Boise-based since {site.founded}</span>
        <Dot at="hidden lg:inline" />
        <span className="hidden lg:inline">One connected team, every stage of home</span>
      </div>
    </section>
  );
}
