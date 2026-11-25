import Link from 'next/link';
import ProcessFilms from '@/components/sections/ProcessFilms';
import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import ProcessTimeline, { type ProcessPhase } from '@/components/sections/ProcessTimeline';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import ProofSection from '@/components/sections/ProofSection';
import FaqSection from '@/components/sections/FaqSection';
import { faqs } from '@/lib/content/faqs';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Design-Build Process | What Happens and When | Timber + Love",
  description:
    'What happens, and when, from the first call to the final walkthrough. One team the whole way.',
  path: '/our-process/',
});

const phases: ProcessPhase[] = [
  {
    title: 'Do we fit?',
    body: 'We start by talking about your goals, your house, your timeline and your budget. Before anyone commits to anything, we both figure out if we\'re a good fit.',
    receive: 'A straight answer on fit, and what comes next',
    decision: "Share your goals, budget, and preferred timing.",
  },
  {
    title: 'We measure your house',
    body: 'We come out and measure the house and note what\'s really there: old wiring, walls that aren\'t square, whatever it turns out to be.',
    receive: 'A measured, documented house',
    decision: "Confirm priorities and any known issues with the home.",
  },
  {
    title: 'First sketches',
    body: 'We sketch a first idea and test it against how you actually live in the house.',
    receive: 'A first sketch you can react to',
    decision: "Review the proposed layout and design direction.",
  },
  {
    title: 'Plans and materials',
    body: 'We tighten up the plans, then sit down with Luke and the team to pick materials, fixtures and finishes before anything gets built.',
    receive: 'Plans and materials you've signed off on',
    decision: "Approve selections and developed plans.",
  },
  {
    title: 'Price and schedule',
    body: 'Once the design is settled, you get the scope, the price and the schedule before any work starts.',
    receive: 'The scope, the price and the schedule',
    decision: "Review the scope, pricing, and proposed schedule.",
  },
  {
    title: 'Permits and ordering',
    body: 'We file for permits and order materials so the right things show up when the crew needs them.',
    receive: 'Permits filed and materials ordered',
    decision: "Stay available for decisions required by the permit or purchasing process.",
  },
  {
    title: 'Construction',
    body: 'We run the job every day: the trades, the schedule, the quality. You get updates as it comes together.',
    receive: 'Steady progress and regular updates',
    decision: "Review progress and agree any changes before they proceed.",
  },
  {
    title: 'Final walkthrough',
    body: 'We walk the finished house with you, fix the last small things and hand it back ready to live in.',
    receive: 'A finished house you can move back into',
    decision: "Walk the home with us and review the final detail list.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Design + Build', path: '/design-and-build/' },
          { name: 'Our Process', path: '/our-process/' },
        ])}
      />

      <PageHero
        eyebrow="Our Process"
        title="How a job goes, step by step"
        subtitle="The same team designs and builds, so nobody has to translate between the two. Here&apos;s what to expect."
        image="/editorial/concrete-entry.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Tell Us About Your House</Cta>
        <Cta href="/timber-and-love-gallery/" variant="secondary">See the Houses</Cta>
      </PageHero>

      <TrustBar />

      {/* Why design-build */}
      <section className="bg-bg-primary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Why design-build</p>
            <h2 className="h-section mt-4">Why one team</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead">
              When one team does both, fewer things fall through the cracks. You have one person to call. Someone tells you what&apos;s buildable while the plans are still being drawn. And if something goes wrong, there&apos;s no other firm to point at.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The timeline */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="eyebrow">Step by Step</p>
            <h2 className="h-section mt-4">What Happens, and When</h2>
          </Reveal>
          <ProcessTimeline phases={phases} />
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-text-secondary">
            Planning the budget early helps every phase. See the common{' '}
            <Link href="/financing/" className="link-underline">financing options</Link> homeowners use for a remodel or custom home.
          </p>
        </div>
      </section>

      <ProcessFilms />

      <ProofSection />

      <FaqSection items={faqs.ourProcess} />

      <ClosingCta {...closingCta.ourProcess} />
    </>
  );
}
