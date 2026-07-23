import ReviewSlider from '@/components/ui/ReviewSlider';
import Stars from '@/components/ui/Stars';
import Reveal from '@/components/ui/Reveal';
import { clientReviews, googleReviews } from '@/lib/content/home';

/**
 * Standard social-proof block for pathway and service pages.
 *
 * Placed immediately before the closing CTA so proof precedes the ask, the
 * highest-leverage position for it. Pathway pages previously carried no
 * testimonials at all, which is where visitors decide whether to trust the firm
 * with a large sum.
 */
export default function ProofSection({
  eyebrow = 'Client Stories',
  title = 'What Boise Homeowners Say',
  background = 'bg-bg-secondary',
}: {
  eyebrow?: string;
  title?: string;
  background?: string;
}) {
  return (
    <section className={`${background} section border-t border-border-subtle`} aria-labelledby="proof-heading">
      <div className="container-wide text-center">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="proof-heading" className="h-section mt-4">
            {title}
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3 text-sm text-text-secondary">
            <span className="text-cream">{googleReviews.rating.toFixed(1)}</span>
            <Stars rating={googleReviews.rating} size="sm" />
            <span>from {googleReviews.count}+ Google reviews</span>
          </div>
        </Reveal>
        <div className="mt-12">
          <ReviewSlider items={clientReviews} />
        </div>
      </div>
    </section>
  );
}
