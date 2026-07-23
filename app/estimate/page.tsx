import { redirect } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Estimator from '@/components/estimator/Estimator';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import { pageMeta } from '@/lib/seo';
import FaqSection from '@/components/sections/FaqSection';
import { faqs } from '@/lib/content/faqs';
import { assertPublishable, DRAFT_RULESET } from '@/lib/planner/ruleset';

/**
 * The quick estimator.
 *
 * This page and /investment-planner both answer "what will my project cost",
 * and the site should not ship two of those. The planner supersedes this in
 * every respect: property intelligence, sourced assumptions, magnitude-tagged
 * exclusions, a computed confidence score, and a sign-off gate this page does
 * not have.
 *
 * The consolidation is deferred rather than immediate, because the planner
 * cannot publish a figure until Appendix A is signed. Redirecting today would
 * replace a working tool with a "coming soon" page and break four inbound
 * links plus the header and mobile-bar CTAs.
 *
 * So the handover is automatic: the moment the band table carries a sign-off,
 * this route redirects and there is exactly one estimator again. Nobody has to
 * remember to do it, and there is no window where both are live.
 */
const PLANNER_READY = assertPublishable(DRAFT_RULESET, new Date()).publishable;

export const metadata = pageMeta({
  title: 'Design + Build Project Estimator',
  description:
    'Answer a few questions to see a preliminary investment range for your Boise design and build project. Not a quote, just a helpful starting point.',
  path: '/estimate/',
  image: '/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg',
});

export default function Page() {
  if (PLANNER_READY) redirect('/investment-planner/');

  return (
    <>
      <PageHero
        eyebrow="Design + Build"
        title="Estimate Your Project"
        subtitle="Answer a few questions to see a preliminary investment range before you submit a full project inquiry. It takes a couple of minutes and needs no construction knowledge."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg"
        height="short"
      />
      <TrustBar />
      <section className="bg-bg-primary section-tight">
        <div className="container-tl">
          <Estimator />
        </div>
      </section>

      <FaqSection items={faqs.estimate} />

      <ClosingCta {...closingCta.estimate} />
    </>
  );
}
