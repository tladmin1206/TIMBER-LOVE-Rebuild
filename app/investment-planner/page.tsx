import Planner from '@/components/planner/Planner';
import TrustBar from '@/components/sections/TrustBar';
import ProofSection from '@/components/sections/ProofSection';
import FaqSection from '@/components/sections/FaqSection';
import ClosingCta from '@/components/sections/ClosingCta';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { closingCta } from '@/lib/content/closing';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { assertPublishable, CALIBRATED_RULESET } from '@/lib/planner/ruleset';
import { site } from '@/lib/site';
import { isPlannerPreview, PREVIEW_NOTICE } from '@/lib/planner/preview';
import type { FaqItem } from '@/components/ui/FAQ';

/**
 * The Investment Planner page. Spec Part II § 11.
 *
 * The planner itself is a client app, but the page's substantive content is
 * server-rendered above and below it. A page whose only content is a React
 * mount point is invisible to crawlers and answer engines, and this page has to
 * earn local search on exactly the question it answers.
 */

const gate = assertPublishable(CALIBRATED_RULESET, new Date());
const LAUNCHED = gate.publishable;
const PREVIEW = isPlannerPreview();

export const metadata = {
  ...pageMeta({
    title: 'Design + Build Investment Planner',
    description:
      'Answer nine questions and see a planning-level investment range for your Boise remodel or new build, with every assumption, exclusion, and timeline shown.',
    path: '/investment-planner/',
  }),
  // Never index a planner that cannot publish a figure.
  // Preview is still noindex, a walkable planner is not a launched one.
  ...(LAUNCHED ? {} : { robots: { index: false, follow: false } }),
};

const faqs: FaqItem[] = [
  {
    q: 'What does a kitchen remodel cost in Boise?',
    a: 'Most full kitchen remodels in the Boise area fall between a refresh of finishes and a structural rebuild, and the scope you choose moves the number more than the size of the room does. The planner walks you through the same questions a project manager would ask and shows you the range those answers produce.',
  },
  {
    q: 'Is this a quote?',
    a: 'No. It is a planning range, not a bid, quote, or proposal. It is the same range an experienced project manager would give you on a first phone call, with the reasoning shown. Your final investment is set after design development, engineering, site evaluation, and final selections.',
  },
  {
    q: 'How long does it take?',
    a: 'About three to four minutes. Nine questions, mostly taps rather than typing, and every question has a "not sure" option that never blocks you.',
  },
  {
    q: 'Do I have to talk to anyone to see my range?',
    a: 'No. You provide contact details so we can send you the report, and then the full range, scope, assumptions, exclusions, and timeline are yours immediately. A call happens only if you ask for one.',
  },
  {
    q: 'Why does the range show assumptions and exclusions?',
    a: 'Because that is where projects actually go wrong. Every assumption we make is listed with where it came from and what it would cost if it turns out to be wrong, and every excluded category carries a rough magnitude. You should be able to see the reasoning, not just the number.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Investment Planner', path: '/investment-planner/' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Design + Build Investment Planning',
            provider: { '@id': `${site.url}/#organization` },
            areaServed: 'Treasure Valley, Idaho',
            url: `${site.url}/investment-planner/`,
          },
        ]}
      />

      <section className="relative isolate flex min-h-[42vh] items-center overflow-hidden bg-bg-primary section sm:min-h-[48vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Kitchen-1-scaled.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Design + Build</p>
            <h1 className="h-page mt-4 text-cream">
              {LAUNCHED ? 'What Will Your Project Cost?' : 'Plan Your Project'}
            </h1>
            {/* Direct-answer block: self-contained and quotable, before any preamble. */}
            <p className="text-lead mt-5">
              {LAUNCHED
                ? 'Answer nine questions about your home and goals, and see a planning-level investment range for your Boise-area remodel or new build: along with every assumption behind it, what it excludes, and how long it takes. It takes about three minutes and it is not a quote.'
                : 'Answer nine questions about your home and goals, and get a clear summary of your project, the questions worth settling, and a direct line to our team: who will follow up with your investment range. It takes about three minutes.'}
            </p>
          </Reveal>
        </div>
      </section>

      <TrustBar />

      <section className="bg-bg-primary section" aria-labelledby="planner-heading">
        <div className="container-wide">
          <h2 id="planner-heading" className="sr-only">
            Investment planner
          </h2>
          {PREVIEW && !LAUNCHED && (
            <p className="alert-error mx-auto mb-10 max-w-3xl" role="status">
              <span className="text-cream">Internal preview.</span> {PREVIEW_NOTICE}
            </p>
          )}
          {/* The planner always runs. Only the *number* waits on sign-off:
              without it the homeowner gets their project summary and a real
              next step, which is honest and useful, rather than a guess. */}
          <Planner pricingLive={LAUNCHED || PREVIEW} />
        </div>
      </section>

      <section className="bg-bg-secondary section border-t border-border-subtle" aria-labelledby="how-heading">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How It Works</p>
            <h2 id="how-heading" className="h-section mt-4">
              A Range, and the Reasoning Behind It
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: '01',
                t: 'We Look Up Your Property',
                b: 'Public records tell us the age, size, and lot, so you confirm a card instead of filling in a form.',
              },
              {
                n: '02',
                t: 'You Answer Nine Questions',
                b: 'Mostly taps. Every question has a "not sure" option, and choosing it never blocks you or counts against you.',
              },
              LAUNCHED
                ? {
                    n: '03',
                    t: 'You See the Whole Picture',
                    b: 'The range, what it includes, what we assumed and why, what it excludes, and what could move it.',
                  }
                : {
                    n: '03',
                    t: 'You Get a Clear Summary',
                    b: 'What we understand about your project, the questions worth settling, and what happens next.',
                  },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 110} className="surface-card p-8">
                <div className="font-sans text-4xl tracking-brand text-cream/40">{s.n}</div>
                <h3 className="h-card mt-6">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProofSection title="What Boise Homeowners Say" />

      <FaqSection items={faqs} eyebrow="Common Questions" title="About the Planner" />

      <ClosingCta {...closingCta.estimate} />
    </>
  );
}

