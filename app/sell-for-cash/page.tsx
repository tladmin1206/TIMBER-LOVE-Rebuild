import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PhotoCard from '@/components/ui/PhotoCard';
import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import ServiceEvidence from '@/components/sections/ServiceEvidence';
import CrossPathways from '@/components/sections/CrossPathways';
import FaqSection from '@/components/sections/FaqSection';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import { faqs } from '@/lib/content/faqs';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Sell Your House for Cash in Boise | Timber + Love",
  description:
    'Thinking about selling your Boise house for cash? Here\'s who it suits, how it works and what happens when you ask for an offer through Buy My House.',
  path: '/sell-for-cash/',
});

const steps = [
  {
    num: '01',
    heading: 'Tell them about the house', image: '/projects/north-end-gem/sunroom.webp',
    body: 'Where it is and what shape it\'s in.',
  },
  {
    num: '02',
    heading: 'They take a look', image: '/editorial/team-studio.webp',
    body: 'They look over what you sent and follow up with questions.',
  },
  {
    num: '03',
    heading: 'You decide', image: '/projects/central-rim/terrace.webp',
    body: 'Talk it through. There\'s no obligation to move forward, and it\'s your call.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Sell for Cash', path: '/sell-for-cash/' }])} />
      <PageHero
        eyebrow="Sell for Cash"
        title="Sell Your Boise Home for Cash"
        subtitle="A cash offer can be the simpler way to sell if you don't want to list. Here's who it suits and how it works."
        image="/projects/due-for-a-raze/exterior.webp"
      >
        <Cta href={site.external.cashOffers} external newTab track="cash_request">
          Request a Cash Offer
        </Cta>
      </PageHero>

      <TrustBar />

      {/* Who it is for */}
      <section className="bg-bg-primary section">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="eyebrow">Who It Is For</p>
            <h2 className="h-section mt-4">A Simpler Way to Sell</h2>
            <p className="text-lead mt-5">
              It fits a job move, an estate, or a house that needs real work. It also fits anyone who&apos;d rather skip the showings.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How the process works */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The steps</p>
            <h2 className="h-section mt-4">How it works</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 90} className="h-full">
                <PhotoCard image={s.image}>
                <div className="font-sans text-4xl tracking-brand text-cream/80">{s.num}</div>
                <h3 className="h-card-sm mt-4">{s.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.body}</p>
                </PhotoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split: a direct sale suits homes and situations of every kind */}
      <EditorialSplit
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Exterior-scaled.jpg"
        imageAlt="Exterior of the Firehouse, a Boise Boys renovation by Timber + Love"
        eyebrow="Condition"
        title="Any house, any condition"
        cta="Request a Cash Offer"
        href={site.external.cashOffers}
        tone="primary"
        ratio="landscape"
      >
        <p>
          Move-in ready or needs real work, it can be a fit if you need to sell without the hassle.
        </p>
        <p>
          No staging, no open houses. You share the house, they review it, and you decide.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement before the closing ask */}
      <FeatureBand
        image="/projects/north-end-gem/living.webp"
        eyebrow="Faster"
        title="Sell fast, skip the showings"
        body="See what a cash offer looks like. You decide if it works."
        cta="Get a Cash Offer"
        href={site.external.cashOffers}
        height="short"
      />

      <ServiceEvidence service="cash" />

      {/* What happens after clicking + external note */}
      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">What Happens Next</p>
            <h2 className="h-section mt-4">Buy My House</h2>
            <p className="text-lead mt-5">
              When you ask for an offer, you&apos;ll go to buymyhouse.co to share details about your house and talk to their team. Nothing is decided by clicking through, and you&apos;re never committed to a sale.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta href={site.external.cashOffers} external newTab track="cash_request">
                Request a Cash Offer
              </Cta>
            </div>
            <p className="mt-5 text-xs text-text-muted">
              Buy My House (buymyhouse.co) is an affiliated Timber + Love site. It opens in a new tab so this page
              stays open behind it.
            </p>
          </Reveal>
        </div>
      </section>


      <CrossPathways keys={['buy-sell', 'design-build']} />

      <FaqSection items={faqs.sellForCash} />

      <ClosingCta {...closingCta.sellForCash} />
    </>
  );
}
