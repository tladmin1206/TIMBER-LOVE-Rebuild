import PageHero from '@/components/sections/PageHero';
import ReviewWall from '@/components/sections/ReviewWall';
import Cta from '@/components/ui/Cta';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import { clientReviews, googleReviews } from '@/lib/content/home';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import EditorialSplit from '@/components/sections/EditorialSplit';

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
        image="/editorial/cottage-fireplace.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
        <a href={googleReviews.url} target="_blank" rel="noopener noreferrer" className="btn-secondary" data-track="reviews_leave">
          Leave a Review ↗
        </a>
      </PageHero>

      <ReviewWall reviews={clientReviews} eyebrow="Client Stories" heading="What Our Clients Say" background="bg-bg-primary" />

      {/* Editorial: the finished homes behind the reviews. */}
      <EditorialSplit
        image="/projects/promise-ln-5106/5106-promise-ln-living-room-fireplace.jpg"
        imageAlt="Bright living room with a marble fireplace and oak details in a Spanish modern custom home by Timber and Love"
        eyebrow="Behind the Reviews"
        title="The Homes People Love to Live In"
        cta="Explore the Homes"
        href="/timber-and-love-gallery/"
        reverse
        tone="secondary"
        ratio="landscape"
      >
        <p>
          Every review here traces back to the same thing: a finished home our clients are genuinely proud to live in.
          The kitchens they gather in, the light-filled rooms, the details that hold up years after the crew leaves.
        </p>
        <p>
          The kind words are nice. The homes are the real proof.
        </p>
      </EditorialSplit>

      <ClosingCta {...closingCta.reviews} />
    </>
  );
}
