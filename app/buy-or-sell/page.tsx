import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PhotoCard from '@/components/ui/PhotoCard';
import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import Stars from '@/components/ui/Stars';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { clientReviews } from '@/lib/content/home';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import ServiceEvidence from '@/components/sections/ServiceEvidence';
import CrossPathways from '@/components/sections/CrossPathways';
import FaqSection from '@/components/sections/FaqSection';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import { faqs } from '@/lib/content/faqs';

const realEstateReview = clientReviews.find((r) => r.role === 'Real Estate Client');

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Timber + Love Realty | Buy or Sell a Home in Boise",
  description:
    'Buy or sell in Boise with Timber + Love Realty. Listings and the realty team are on timberandloverealty.com.',
  path: '/buy-or-sell/',
});

const sections = [
  {
    eyebrow: 'Buying',
    heading: 'Buying', image: '/projects/promise-ln-5106/5106-promise-ln-living-room-fireplace.jpg',
    body: 'We help you find listings, compare neighborhoods and see what a house is really offering. You set the pace.',
  },
  {
    eyebrow: 'Selling',
    heading: 'Selling', image: '/projects/due-for-a-raze/exterior.webp',
    body: 'We help you get the house ready, price it and see it through to closing, with straight advice about what the Boise market is doing.',
  },
  {
    eyebrow: 'Local Market Experience',
    heading: 'People Who Know Boise', image: '/projects/central-rim/exterior.webp',
    body: 'We\'ve worked in Boise since 2015. We know the neighborhoods, the older houses and how this market moves.',
  },
  {
    eyebrow: 'Who It Serves',
    heading: 'Buyers and sellers across the Treasure Valley', image: '/projects/north-end-gem/living.webp',
    body: 'First home, bigger home, or a house you\'ve loved for years and are finally selling. We do all of it, and we\'ll tell you what we think.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Buy or Sell', path: '/buy-or-sell/' }])} />
      <PageHero
        eyebrow="Buy or Sell"
        title="Buy or Sell a Home in Boise"
        subtitle="Timber + Love Realty buys and sells homes across Boise, and the team knows the neighborhoods."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Realty-Background-1-scaled-1.jpg"
      >
        <Cta href={site.external.realtyBuy} external newTab track="realty_browse">
          Browse Homes
        </Cta>
        <Cta href={site.external.realtySell} variant="secondary" external newTab track="realty_sell">
          Sell a Home
        </Cta>
      </PageHero>

      <TrustBar />

      {/* Real estate client proof */}
      {realEstateReview && (
        <section className="bg-bg-primary section-tight" aria-label="Client review">
          <div className="container-wide max-w-3xl text-center">
            <Reveal>
              <Stars rating={5} size="md" />
              <blockquote className="mt-5 text-xl leading-relaxed text-cream sm:text-2xl">
                “{realEstateReview.quote}”
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-text-muted">
                {realEstateReview.name} · {realEstateReview.role}
              </figcaption>
            </Reveal>
          </div>
        </section>
      )}

      {/* What visitors will find on the linked site */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Next stop</p>
            <h2 className="h-section mt-4">Timber + Love Realty is on its own site</h2>
            <p className="text-lead mt-5">
              Listings, advice on buying and selling, and the realty team all live on timberandloverealty.com. Head over when you&apos;re ready.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Buying / Selling / Local / Who it serves */}
      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2">
            {sections.map((s, i) => (
              <Reveal key={s.eyebrow} delay={i * 80} className="h-full">
                <PhotoCard image={s.image}>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="h-card mt-3">{s.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.body}</p>
                </PhotoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split: a real Boise home makes the buying conversation tangible */}
      <EditorialSplit
        image="/editorial/estate-hearth.webp"
        imageAlt="An inviting living room with black framed windows and a fireplace, designed by Timber + Love"
        eyebrow="Buying in Boise"
        title="Buying a house that's been remodeled"
        cta="Browse Homes"
        href={site.external.realtyBuy}
        tone="secondary"
        ratio="landscape"
      >
        <p>
          Because we build and remodel houses, we can walk a place with you and say what moving a wall or redoing a kitchen would really take.
        </p>
        <p>
          You see what a house is really offering before you make an offer.
        </p>
      </EditorialSplit>

      {/* Editorial split: sellers benefit from homes presented at their best */}
      <EditorialSplit
        image="/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg"
        imageAlt="Board-and-batten modern farmhouse with black windows, a custom home built by Timber + Love"
        eyebrow="Selling in Boise"
        title="Get the house ready to sell"
        cta="Sell a Home"
        href={site.external.realtySell}
        reverse
        tone="primary"
        ratio="landscape"
      >
        <p>
          We know what buyers look at, from the front walk to the finishes inside, because we build houses for a living.
        </p>
        <p>
          That helps when it&apos;s time to get the house ready and see the sale through to closing.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement before the closing ask */}
      <FeatureBand
        image="/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Exterior-1-3-scaled.jpg"
        eyebrow="Buying or Selling in Boise"
        title="Start to finish"
        body="From the first showing to closing day, you're dealing with people who know this market."
        cta="Talk to Us"
        href="/contact/"
        height="short"
      />

      <ServiceEvidence service="realty" />

      {/* Primary external CTA with affiliated-site note */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Visit the site</p>
            <h2 className="h-section mt-4">Ready to look at homes?</h2>
            <p className="text-lead mt-5">
              Start browsing listings or tell us you want to sell. Opens timberandloverealty.com in a new tab.
            </p>
            <div className="cta-row-center mt-8">
              <Cta href={site.external.realty} external newTab track="realty_visit">
                Visit Timber + Love Realty
              </Cta>
            </div>
            </Reveal>
        </div>
      </section>


      <CrossPathways keys={['design-build', 'sell-cash']} />

      <FaqSection items={faqs.buyOrSell} />

      <ClosingCta {...closingCta.buyOrSell} />
    </>
  );
}
