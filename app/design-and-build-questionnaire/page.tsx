import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import PressStrip from '@/components/sections/PressStrip';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import { processSteps } from '@/lib/content/home';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Start Your Design + Build Project',
  description:
    'Tell us about your project and we will help determine whether Timber and Love is the right fit for your design and build needs.',
  path: '/design-and-build-questionnaire/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Start Your Project"
        title="Tell Us About Your Project"
        subtitle="Share a few details about your home and goals. We will review your project and follow up about next steps and whether we are a good fit."
        image="/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg"
        height="short"
      />

      <PressStrip />

      {/* 3-step process */}
      <section className="bg-ink py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How It Works</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Our Process in 3 Steps</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 100} className="text-center">
                <div className="font-sans text-5xl tracking-brand text-cream/30">{step.num}</div>
                <h3 className="h-display mt-4 text-xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-body">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded lead form (matches the live leads.timberandlove.com form) */}
      <section className="border-t border-cream/10 bg-panel py-16 sm:py-24">
        <div className="container-tl max-w-2xl">
          <Reveal>
            <iframe
              src="https://leads.timberandlove.com/forms/combined?transparent=true"
              title="Design + Build Questionnaire"
              className="min-h-[860px] w-full border-0"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <BeginJourneyCta />
    </>
  );
}
