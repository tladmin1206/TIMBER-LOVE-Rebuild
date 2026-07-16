import Link from 'next/link';
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

      {/* Closing CTA */}
      <section className="bg-bg-secondary py-20 text-center sm:py-24">
        <div className="container-wide max-w-2xl">
          <Reveal>
            <p className="eyebrow">Your Turn</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Let&apos;s Build Something You&apos;ll Rave About</h2>
            <p className="text-lead mt-4">
              Tell us about your home and goals, and see why Boise homeowners trust Timber and Love.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
              <Link href="/timber-and-love-gallery/" className="btn-secondary">See Our Work</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
