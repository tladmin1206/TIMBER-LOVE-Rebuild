import PageHero from '@/components/sections/PageHero';
import ReviewWall from '@/components/sections/ReviewWall';
import Stars from '@/components/ui/Stars';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import { clientReviews, googleReviews } from '@/lib/content/home';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import TrustBar from '@/components/sections/TrustBar';

export const metadata = pageMeta({
  title: 'Reviews',
  description:
    'Read what Boise homeowners say about Timber and Love. Rated 4.9 stars across design-build and real estate clients.',
  path: '/reviews/',
});

// AggregateRating schema (eligible: real reviews with an author and rating).
const ratingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: googleReviews.rating,
    reviewCount: googleReviews.count,
    bestRating: 5,
  },
  review: clientReviews.map((r) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    author: { '@type': 'Person', name: r.name },
    reviewBody: r.quote,
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          ratingSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Reviews', path: '/reviews/' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Reviews"
        title="Trusted by Boise Homeowners"
        subtitle="Real reviews from the people we have designed, built, bought, and sold homes for across the Treasure Valley."
        image="/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Living-Room-1-scaled.jpg"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
        <a href={googleReviews.url} target="_blank" rel="noopener noreferrer" className="btn-secondary" data-track="reviews_leave">
          Leave a Review ↗
        </a>
      </PageHero>

      <TrustBar />

      {/* Aggregate rating headline */}
      <section className="border-b border-border-subtle bg-bg-secondary py-14 text-center">
        <Reveal className="container-wide">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="text-5xl text-cream">{googleReviews.rating.toFixed(1)}</span>
              <Stars rating={googleReviews.rating} size="lg" />
            </div>
            <a href={googleReviews.url} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.16em] text-text-secondary link-underline" data-track="reviews_google">
              Based on {googleReviews.count}+ Google reviews ↗
            </a>
          </div>
        </Reveal>
      </section>

      <ReviewWall reviews={clientReviews} eyebrow="Client Stories" heading="What Our Clients Say" background="bg-bg-primary" />

      <ClosingCta {...closingCta.reviews} />
    </>
  );
}
