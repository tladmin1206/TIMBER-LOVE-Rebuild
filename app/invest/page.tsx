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
    'Real estate investment information from Timber + Love Realty, who it\'s for and what happens when you head to the realty site.',
  path: '/invest/',
});

const sections = [
  {
    eyebrow: 'What Is Available',
    heading: 'Information and Opportunities', image: '/projects/promise-ln-5142/5142-promise-ln-exterior-angle.jpg',
    body: 'The realty site shares investment information, plus opportunities to invest alongside the Timber + Love team. It\'s a place to see how we approach real estate and whether it fits what you\'re looking for.',
  },
  {
    eyebrow: 'Who It Is For',
    heading: 'People thinking about investing', image: '/projects/due-for-a-raze/exterior.webp',
    body: 'For people who are thinking about real estate as part of a bigger plan and want to ask questions first. It\'s a conversation, not a decision you make on the spot.',
  },
  {
    eyebrow: 'What Happens Next',
    heading: 'You head to the realty site', image: '/projects/due-for-a-raze/exterior.webp',
    body: 'When you click through, you go to Timber + Love Realty, an affiliated Timber + Love site, where you can read more and reach out to the team. Clicking through commits you to nothing.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Invest', path: '/invest/' }])} />
      <PageHero
        eyebrow="Invest"
        title="Invest in Boise Real Estate"
        subtitle="Timber + Love Realty shares information about investing in Boise real estate. This page covers who it's for, then sends you to the realty site for details."
        image="/editorial/estate-exterior.webp"
      >
        <Cta href={site.external.invest} external newTab track="invest_explore">
          See Investment Opportunities
        </Cta>
      </PageHero>

      <TrustBar />

      {/* What is available / who it is for / what happens next */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What you can find there</p>
            <h2 className="h-section mt-4">What&apos;s on the realty site</h2>
            
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
        eyebrow="Built to last"
        title="A house we built"
        cta="See Our Work"
        href="/timber-and-love-gallery/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          The way Timber + Love thinks about real estate is grounded in homes that are actually built. This is a custom contemporary we built on Promise Lane.
        </p>
        <p>
          Look at the finished work, then review each proposed opportunity on its own terms, including the structure, costs, risks and assumptions.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement before the closing ask */}
      <FeatureBand
        image="/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Exterior-1-3-scaled.jpg"
        eyebrow="Investing"
        title="Talk to us about investing in Boise"
        body="Ask us how we approach real estate and what opportunities are out there in the Treasure Valley."
        cta="Talk About Investing"
        href="/contact/#general"
        height="short"
      />

      <ServiceEvidence service="invest" />

      {/* Primary external CTA + affiliated-site note */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Next</p>
            <h2 className="h-section mt-4">Read more</h2>
            <p className="text-lead mt-5">
              Read more and send us your questions. Opens timberandloverealty.com in a new tab, an affiliated Timber + Love site.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta href={site.external.invest} external newTab track="invest_explore">
                See Investment Opportunities
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
