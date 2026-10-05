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

export const metadata = pageMeta({
  title: 'Our Design-Build Process',
  description:
    'See exactly what happens when you work with Timber and Love, from the first consultation through final walkthrough. One connected team, one clear process.',
  path: '/our-process/',
  image: '/editorial/concrete-entry.webp',
});

const phases: ProcessPhase[] = [
  {
    title: 'Initial Fit & Consultation',
    body: 'We start with a conversation about your goals, your home, your timeline, and your budget. This is where we make sure we are a good fit for each other before anyone commits to anything.',
    receive: 'A clear sense of fit and next steps',
    decision: "Share your goals, budget, and preferred timing.",
  },
  {
    title: 'Existing Conditions & Discovery',
    body: 'Our team documents your home as it is today. We measure, note existing conditions, and gather the details that shape what is possible and what to plan for.',
    receive: 'Accurate as-built understanding of your home',
    decision: "Confirm priorities and any known issues with the home.",
  },
  {
    title: 'Concept Development',
    body: 'We translate your goals into an initial design direction, testing layouts and ideas against how you actually want to live in the space.',
    receive: 'A concept direction to react to and refine',
    decision: "Review the proposed layout and design direction.",
  },
  {
    title: 'Design Development & Selections',
    body: 'We refine the plans and, in a design presentation with Luke and the team, review materials, fixtures, and finishes so the details reflect your vision before construction.',
    receive: 'Developed plans and a materials palette you approve',
    decision: "Approve selections and developed plans.",
  },
  {
    title: 'Pricing & Construction Planning',
    body: 'With the design settled, we build a detailed scope and pricing plan and map out the construction schedule so you can review the investment and sequence before work begins.',
    receive: 'A clear scope, price, and schedule',
    decision: "Review the scope, pricing, and proposed schedule.",
  },
  {
    title: 'Permitting & Procurement',
    body: 'We submit for the permits your project requires and strategically source and order materials so the right things arrive at the right time.',
    receive: 'Approvals in motion and materials secured',
    decision: "Stay available for decisions required by the permit or purchasing process.",
  },
  {
    title: 'Construction',
    body: 'Our team manages the build day to day, coordinating trades, holding quality standards, and keeping you informed as your home takes shape.',
    receive: 'Steady progress and clear communication',
    decision: "Review progress and agree any changes before they proceed.",
  },
  {
    title: 'Final Walkthrough & Completion',
    body: 'We walk the finished project with you, address any final details, and hand back a home that is ready to live in and enjoy.',
    receive: 'A finished home, done right',
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
        title="One Team, One Clear Process"
        subtitle="With design and construction under one roof, your project stays coordinated from the first conversation through the final walkthrough. Here is exactly what to expect."
        image="/editorial/concrete-entry.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
        <Cta href="/timber-and-love-gallery/" variant="secondary">View Our Work</Cta>
      </PageHero>

      <TrustBar />

      {/* Why design-build */}
      <section className="bg-bg-primary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">The Design-Build Advantage</p>
            <h2 className="h-section mt-4">Why One Team Makes the Difference</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead">
              When the same team designs and builds, there are fewer gaps between the vision and the finished result.
              You get one point of contact, earlier feasibility input, more coordinated selections, and clear ownership
              from concept through completion.
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
        </div>
      </section>

      <ProcessFilms />

      <ProofSection />

      <FaqSection items={faqs.ourProcess} />

      <ClosingCta {...closingCta.ourProcess} />
    </>
  );
}
