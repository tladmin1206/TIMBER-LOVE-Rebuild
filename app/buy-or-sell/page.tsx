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
import ProofSection from '@/components/sections/ProofSection';
import CrossPathways from '@/components/sections/CrossPathways';
import FaqSection from '@/components/sections/FaqSection';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import { faqs } from '@/lib/content/faqs';

const realEstateReview = clientReviews.find((r) => r.role === 'Real Estate Client');

export const metadata = pageMeta({
  title: 'Buy or Sell a Home in Boise',
  description:
    'Buy or sell a home in Boise with Timber and Love Realty. Local market experience for buyers and sellers, with listings and support on our affiliated real estate site.',
  path: '/buy-or-sell/',
  image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Realty-Background-1-scaled-1.jpg',
});

const sections = [
  {
    eyebrow: 'Buying',
    heading: 'Find a Home That Fits Your Life', image: '/projects/promise-ln-5106/5106-promise-ln-living-room-fireplace.jpg',
    body: 'Buying a home is a big decision, and it helps to have people who know the area well. Timber and Love Realty works with buyers across Boise to search current listings, compare neighborhoods, and understand what a home is really offering. You set the pace, and the team keeps the details organized so you can make a confident choice.',
  },
  {
    eyebrow: 'Selling',
    heading: 'Sell With Local Guidance', image: '/projects/promise-ln-5120/5120-promise-ln-exterior-rear.jpg',
    body: 'When it is time to sell, presentation and pricing matter. Timber and Love Realty helps sellers prepare a home for the market, position it for the right buyers, and manage the process through to closing. You get straightforward advice grounded in what is actually happening in the Boise market.',
  },
  {
    eyebrow: 'Local Market Experience',
    heading: 'People Who Know Boise', image: '/projects/central-rim/exterior.webp',
    body: 'Timber and Love has been part of the Boise community since 2015, and that local perspective carries into every real estate conversation. Buyers and sellers benefit from a team that understands the neighborhoods, the housing stock, and the way this market moves.',
  },
  {
    eyebrow: 'Who It Serves',
    heading: 'Buyers and Sellers Across the Treasure Valley', image: '/projects/north-end-gem/living.webp',
    body: 'Whether you are searching for your first home, moving up, or listing a property you have loved for years, Timber and Love Realty works with people at many stages. The goal is the same each time: clear communication and real estate support you can trust.',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Buy or Sell"
        title="Buy or Sell a Home in Boise"
        subtitle="Timber and Love Realty helps people buy and sell homes across Boise, backed by local market experience and a team that knows the area."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Realty-Background-1-scaled-1.jpg"
      >
        <Cta href={site.external.realty} external newTab track="realty_browse">
          Browse Homes
        </Cta>
        <Cta href={site.external.realty} variant="secondary" external newTab track="realty_sell">
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
            <p className="eyebrow">What You Will Find</p>
            <h2 className="h-section mt-4">Continue to Timber and Love Realty</h2>
            <p className="text-lead mt-5">
              Timber and Love Realty is our affiliated real estate site. There you can browse current listings, learn
              about buying and selling in Boise, and connect with the team directly. This page introduces the site so
              you know what to expect before you head over.
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
        imageAlt="An inviting living room with black framed windows and a fireplace, designed by Timber and Love"
        eyebrow="Buying in Boise"
        title="Find a Home That Fits Your Life"
        cta="Browse Homes"
        href={site.external.realty}
        tone="secondary"
        ratio="landscape"
      >
        <p>
          A home is more than a listing. Homes like this one, renovated by the Timber and Love team, are the kind of
          Boise property buyers picture when they imagine settling in.
        </p>
        <p>
          Working with a team that knows both the market and how homes are built means you see what a house is really
          offering before you make an offer.
        </p>
      </EditorialSplit>

      {/* Editorial split: sellers benefit from homes presented at their best */}
      <EditorialSplit
        image="/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg"
        imageAlt="Board-and-batten modern farmhouse with black windows, a custom home built by Timber and Love"
        eyebrow="Selling in Boise"
        title="Position Your Home to Sell"
        cta="Sell a Home"
        href={site.external.realty}
        reverse
        tone="primary"
        ratio="landscape"
      >
        <p>
          Presentation and pricing decide how a sale goes. Our team understands what today's buyers respond to, from
          curb appeal to the finishes inside, because we build homes to that standard ourselves.
        </p>
        <p>
          That perspective helps sellers prepare a home for the market, position it for the right buyers, and move
          through to closing with straightforward, local guidance.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement before the closing ask */}
      <FeatureBand
        image="/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Exterior-1-3-scaled.jpg"
        eyebrow="Buying or Selling in Boise"
        title="Local Guidance, Start to Finish"
        body="From the first showing to closing day, our team knows this market and stays in your corner the whole way."
        cta="Talk to Our Team"
        href="/contact/"
        height="short"
      />

      {/* Primary external CTA with affiliated-site note */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Visit the Site</p>
            <h2 className="h-section mt-4">Ready to Look at Homes?</h2>
            <p className="text-lead mt-5">
              Start browsing listings or begin a conversation about selling. You will continue to Timber and Love
              Realty, our affiliated real estate site, in a new tab.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Cta href={site.external.realty} external newTab track="realty_visit">
                Visit Timber and Love Realty
              </Cta>
            </div>
            <p className="mt-5 text-xs text-text-muted">
              Timber and Love Realty is an affiliated Timber and Love site. It opens in a new tab so this page stays
              open behind it.
            </p>
          </Reveal>
        </div>
      </section>

      <ProofSection />

      <CrossPathways keys={['design-build', 'sell-cash']} />

      <FaqSection items={faqs.buyOrSell} />

      <ClosingCta {...closingCta.buyOrSell} />
    </>
  );
}
