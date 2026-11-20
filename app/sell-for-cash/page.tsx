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
    'Explore a direct home offer through Buy My House, an affiliated Timber + Love site. Learn who a cash sale suits and how the process works before you continue.',
  path: '/sell-for-cash/',
});

const steps = [
  {
    num: '01',
    heading: 'Share Your Property', image: '/projects/north-end-gem/sunroom.webp',
    body: 'You start by telling Buy My House about the home, including its location and condition. This gives the team the basic information they need to review your property.',
  },
  {
    num: '02',
    heading: 'The Team Reviews It', image: '/editorial/team-studio.webp',
    body: 'Buy My House looks over the details you provide and follows up to learn more about the home and your situation.',
  },
  {
    num: '03',
    heading: 'You Talk Through Options', image: '/projects/central-rim/terrace.webp',
    body: 'From there, you can discuss whether a direct sale makes sense for you. There is no obligation to move forward, and you stay in control of the decision.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Sell for Cash', path: '/sell-for-cash/' }])} />
      <PageHero
        eyebrow="Sell for Cash"
        title="Sell Your Boise Home for Cash"
        subtitle="A direct home offer can be a simpler path for homeowners who want to sell without listing on the open market. Here is who it suits and how it works."
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
              A direct home offer can suit people who value a straightforward process over the traditional listing
              route. That might be an owner facing a move on a tight timeline, someone with a property that needs work,
              or a homeowner who simply prefers to skip showings and open houses. If any of that sounds like you, it is
              worth a look.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How the process works */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How It Works</p>
            <h2 className="h-section mt-4">A High-Level Look at the Process</h2>
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
        eyebrow="Any Home, Any Condition"
        title="A Path That Fits Your Situation"
        cta="Request a Cash Offer"
        href={site.external.cashOffers}
        tone="primary"
        ratio="landscape"
      >
        <p>
          A direct sale is not only for one kind of house. Homes at every stage, from move-in ready to in need of real
          work, can be a fit when the timeline or the situation calls for a simpler route.
        </p>
        <p>
          There is no staging to arrange and no open houses to sit through. You share the property, the team reviews it,
          and you decide whether a direct offer is right for you.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement before the closing ask */}
      <FeatureBand
        image="/projects/north-end-gem/living.webp"
        eyebrow="A Simpler Path"
        title="Sell Quickly, On Your Terms"
        body="Skip the showings and the waiting. See what a direct offer looks like and move at the pace that works for you."
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
            <h2 className="h-section mt-4">Continue to Buy My House</h2>
            <p className="text-lead mt-5">
              When you request a cash offer, you continue to Buy My House at buymyhouse.co, an affiliated Timber and
              Love site. There you can share details about your home and start a conversation with their team. Nothing
              is decided by clicking through, and you are never committed to a sale.
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
