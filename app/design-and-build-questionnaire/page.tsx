import { Suspense } from 'react';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import PressStrip from '@/components/sections/PressStrip';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import ProjectInquiry from '@/components/forms/ProjectInquiry';
import WhatHappensNext from '@/components/sections/WhatHappensNext';
import { processSteps } from '@/lib/content/home';
import { pageMeta } from '@/lib/seo';
import TrustBar from '@/components/sections/TrustBar';

export const metadata = pageMeta({
  title: 'Start Your Design + Build Project',
  description:
    'Tell us about your project and we will help determine whether Timber and Love is the right fit for your design and build needs.',
  path: '/design-and-build-questionnaire/',
});

function formatMoney(v: string) {
  const [low, high] = v.split('-').map((n) => parseInt(n, 10));
  if (!Number.isFinite(low) || !Number.isFinite(high)) return null;
  return `$${low.toLocaleString()} to $${high.toLocaleString()}`;
}

export default function Page({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const rangeParam = typeof searchParams?.range === 'string' ? searchParams.range : undefined;
  const range = rangeParam ? formatMoney(rangeParam) : null;
  const categoryParam = typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <>
      <PageHero
        eyebrow="Start Your Project"
        title="Tell Us About Your Project"
        subtitle="Share a few details about your home and goals. We will review your project and follow up about next steps and whether we are a good fit."
        image="/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Kitchen-1-scaled.jpg"
        height="short"
      />

      <TrustBar />

      {/* Estimator handoff summary: carried over so we do not re-ask. */}
      {(range || categoryParam) && (
        <section className="bg-bg-secondary py-6">
          <div className="container-tl max-w-2xl">
            <div className="surface-card p-5 text-sm text-text-secondary">
              <p className="field-label mb-2">From your estimate</p>
              {categoryParam && <p>Project type: {categoryParam.replace(/-/g, ' ')}</p>}
              {range && <p className="mt-1">Preliminary range: <span className="text-cream">{range}</span> (preliminary, not a quote)</p>}
            </div>
          </div>
        </section>
      )}

      <PressStrip />

      {/* 3-step process */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How It Works</p>
            <h2 className="h-section mt-4">Our Process in 3 Steps</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 100} className="text-center">
                <div className="font-sans text-5xl tracking-brand text-cream/30">{step.num}</div>
                <h3 className="h-card mt-4">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-body">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Native multi-step project inquiry */}
      <section id="inquiry" className="border-t border-border-subtle bg-bg-secondary section">
        <div className="container-tl">
          {/* Expectations stated at the form itself, not on a separate page the
              visitor would have to go and find. */}
          <div className="mx-auto mb-12 max-w-2xl">
            <p className="field-label mb-4">What Happens After You Submit</p>
            <WhatHappensNext compact />
          </div>
          <Suspense fallback={<div className="mx-auto min-h-[500px] max-w-2xl" />}>
            <ProjectInquiry />
          </Suspense>
        </div>
      </section>

      <ClosingCta {...closingCta.questionnaire} />
    </>
  );
}
