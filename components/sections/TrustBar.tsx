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
  return (
    <section aria-label="Trust indicators" className="border-y border-border-subtle bg-bg-secondary">
      <div className="container-wide flex flex-wrap items-center justify-center divide-x divide-border-subtle text-xs uppercase tracking-[0.14em] text-text-secondary">
        <a
          href={googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          data-track="trustbar_reviews"
          className="flex min-h-12 items-center gap-2 px-6 transition-colors hover:text-cream"
        >
          <span>Read Google Reviews</span>
        </a>
        <span className="hidden px-6 sm:inline">As seen on HGTV&apos;s Boise Boys</span>
        <span className="hidden px-6 md:inline">Boise-based since {site.founded}</span>
      </div>
    </section>
  );
}
