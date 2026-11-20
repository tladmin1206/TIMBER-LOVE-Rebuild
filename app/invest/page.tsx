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
  title: "Boise Real Estate Investment | With Timber + Love",
  description:
    'Learn about real estate investment information available through Timber + Love Realty, an affiliated Timber + Love site, and who it is intended for.',
  path: '/invest/',
});

const sections = [
  {
    eyebrow: 'What Is Available',
    heading: 'Information and Opportunities', image: '/projects/promise-ln-5142/5142-promise-ln-exterior-angle.jpg',
    body: 'The affiliated site shares real estate investment information along with opportunities to invest alongside the Timber + Love team. It is a place to learn how the group approaches real estate investment and to see whether it lines up with what you are looking for.',
  },
  {
    eyebrow: 'Who It Is For',
    heading: 'People Considering Real Estate Investment', image: '/projects/due-for-a-raze/exterior.webp',
    body: 'This information is intended for people who are exploring real estate as part of their broader plans and want to understand the options before making any commitment. It is a starting point for a conversation, not a decision you make on the spot.',
  },
  {
    eyebrow: 'What Happens Next',
    heading: 'You Continue to the Affiliated Site', image: '/projects/due-for-a-raze/exterior.webp',
    body: 'When you choose to explore, you continue to Timber + Love Realty, an affiliated Timber + Love site, where you can read more and reach out to the team. Clicking through starts the conversation and commits you to nothing.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Invest', path: '/invest/' }])} />
      <PageHero
        eyebrow="Invest"
        title="Invest in Boise Real Estate"
        subtitle="Timber + Love Realty shares Boise real estate investment information and opportunities for people considering an investment property. This page explains who it suits, then sends you to the affiliated realty site for details."
        image="/editorial/estate-exterior.webp"
      >
        <Cta href={site.external.invest} external newTab track="invest_explore">
          Explore Investment Opportunities
        </Cta>
      </PageHero>

      <TrustBar />

      {/* What is available / who it is for / what happens next */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Before You Continue</p>
            <h2 className="h-section mt-4">What to Expect</h2>
            <p className="text-lead mt-5">
              This page introduces the affiliated site so you know what you are stepping into. Here is what is
              available, who it is intended for, and what happens when you head over.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {sections.map((s, i) => (
              <Reveal key={s.eyebrow} delay={i * 90} className="h-full">
                <PhotoCard image={s.image}>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="h-card-sm mt-3">{s.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.body}</p>
                </PhotoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split: a real, finished custom home makes the value case concrete */}
      <EditorialSplit
        image="/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg"
        imageAlt="Charcoal modern contemporary custom home with a butterfly roof, built by Timber + Love in Boise"
        eyebrow="Real Estate, Built to Last"
        title="Value You Can Stand In Front Of"
        cta="See Our Work"
        href="/timber-and-love-gallery/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          The way Timber + Love thinks about real estate is grounded in homes that are actually built. This custom contemporary shows the team’s approach to architecture, materials, and finished detail.
        </p>
        <p>
          Explore the finished work, then review each proposed opportunity on its own terms, including the structure, costs, risks, and assumptions.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement before the closing ask */}
      <FeatureBand
        image="/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Exterior-1-3-scaled.jpg"
        eyebrow="Invest With Intention"
        title="Build Value That Lasts"
        body="Explore how the Timber + Love team approaches real estate and start a conversation about opportunities in the Treasure Valley."
        cta="Talk About Investing"
        href="/contact/#general"
        height="short"
      />

      <ServiceEvidence service="invest" />

      {/* Primary external CTA + affiliated-site note */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Take a Look</p>
            <h2 className="h-section mt-4">Explore the Details</h2>
            <p className="text-lead mt-5">
              Read more about how Timber + Love approaches real estate investment and reach out with your questions.
              You will continue to Timber + Love Realty, our affiliated site, in a new tab.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta href={site.external.invest} external newTab track="invest_explore">
                Explore Investment Opportunities
              </Cta>
            </div>
            <p className="mt-5 text-xs text-text-muted">
              This link opens Timber + Love Realty, an affiliated Timber + Love site, in a new tab so this page
              stays open behind it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Financial disclaimer */}
      <section className="border-t border-border-subtle bg-bg-primary section-tight">
        <div className="container-wide max-w-3xl">
          <Reveal className="surface-card p-8">
            <p className="eyebrow">Disclaimer</p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              The information provided here and on the affiliated site is general in nature and is offered for
              educational purposes only. It is not financial, investment, tax, or legal advice, and it is not a
              recommendation to buy or sell any asset. No returns or outcomes are promised or guaranteed. All
              investments carry risk. Please consult a qualified professional before making any financial decision.
            </p>
          </Reveal>
        </div>
      </section>


      <CrossPathways keys={['design-build', 'stay']} />

      <FaqSection items={faqs.invest} />

      <ClosingCta {...closingCta.invest} />
    </>
  );
}
