import PageHero from '@/components/sections/PageHero';
import ReviewWall from '@/components/sections/ReviewWall';
import Cta from '@/components/ui/Cta';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import { clientReviews } from '@/lib/content/home';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import EditorialSplit from '@/components/sections/EditorialSplit';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Timber + Love Reviews | Boise Design-Build Clients",
  description: "Timber + Love reviews from Boise homeowners are published on Google. Read them there, see the custom homes and remodels behind them, and share your own.",
  path: '/reviews/',
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Reviews', path: '/reviews/' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Reviews"
        title="What Boise homeowners say"
        subtitle="See what Boise homeowners say about working with us on Google, and take a look at the homes behind the reviews."
        image="/editorial/cottage-fireplace.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Tell Us About Your House</Cta>
        <a href={site.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !border-cream !bg-ink/80 !text-cream ![backdrop-filter:none] [@media(hover:hover)]:hover:!bg-cream [@media(hover:hover)]:hover:!text-on-accent" data-track="reviews_leave">
          Leave a Review ↗
        </a>
      </PageHero>

      <ReviewWall reviews={clientReviews} eyebrow="Client Stories" heading="What Our Clients Say" background="bg-bg-primary" />

      {/* Editorial: the finished homes behind the reviews. */}
      <EditorialSplit
        image="/projects/promise-ln-5106/5106-promise-ln-living-room-fireplace.jpg"
        imageAlt="Bright living room with a marble fireplace and oak details in a Spanish modern custom home by Timber + Love"
        eyebrow="The Homes"
        title="Houses people love living in"
        cta="See the Houses"
        href="/timber-and-love-gallery/"
        reverse
        tone="secondary"
        ratio="landscape"
      >
        <p>
          The proof is in the finished houses: the kitchens people end up in, and the details that hold up after the crew leaves.
        </p>
        <p>
          Read client stories on Google. The homes are here.
        </p>
      </EditorialSplit>

      <ClosingCta {...closingCta.reviews} />
    </>
  );
}
