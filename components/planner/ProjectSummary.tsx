'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * What a homeowner sees before pricing is signed off.
 *
 * The planner cannot publish a figure until Appendix A is approved, and
 * inventing one is the failure this whole product is built to avoid. But the
 * number was never the only value: knowing your project is understood, knowing
 * exactly which questions still matter, and knowing what happens next is worth
 * the four minutes on its own.
 *
 * So this screen delivers everything the answers support and states plainly
 * where the range comes from. No dollar figures appear anywhere, because none
 * have been approved.
 */

const TYPE_LABEL: Record<string, string> = {
  kitchen: 'Kitchen',
  bathroom: 'Primary bathroom',
  'bathroom-guest': 'Guest bathroom',
  'whole-home': 'Whole home',
  multiple: 'More than one space',
  'new-construction': 'New construction',
};

const SCOPE_LABEL: Record<string, string> = {
  refresh: 'Refresh: new finishes, existing layout',
  reimagine: 'Reimagine: new layout, same footprint',
  rebuild: 'Rebuild: structural changes',
};

const TIER_LABEL: Record<string, string> = {
  signature: 'Signature',
  elevated: 'Elevated',
  bespoke: 'Bespoke',
};

const TIMELINE_LABEL: Record<string, string> = {
  asap: 'As soon as possible',
  '3-6mo': 'In 3 to 6 months',
  '6-12mo': 'In 6 to 12 months',
  planning: 'Planning ahead',
  'no-land': 'Land not yet secured',
};

export type SummaryInput = {
  projectType?: string;
  scopeLevel?: string;
  finishTier?: string;
  timeline?: string;
  yearBuilt?: number;
  finishedSqFt?: number;
  goals?: string[];
};

export default function ProjectSummary({
  answers,
  questions,
  firstName,
}: {
  answers: SummaryInput;
  questions: string[];
  firstName?: string;
}) {
  const rows = [
    ['Project', TYPE_LABEL[answers.projectType ?? ''] ?? '-'],
    ['Scope', SCOPE_LABEL[answers.scopeLevel ?? ''] ?? 'To confirm together'],
    ['Finish level', TIER_LABEL[answers.finishTier ?? ''] ?? 'To confirm together'],
    ['Timing', TIMELINE_LABEL[answers.timeline ?? ''] ?? '-'],
    [
      'Home',
      [answers.yearBuilt ? `Built ${answers.yearBuilt}` : null, answers.finishedSqFt ? `${answers.finishedSqFt.toLocaleString('en-US')} sq ft` : null]
        .filter(Boolean)
        .join(' · ') || '-',
    ],
  ].filter(([, v]) => v !== '-');

  return (
    <div className="space-y-16 sm:space-y-20">
      <section aria-labelledby="summary-heading">
        <p className="eyebrow">{firstName ? `Thank you, ${firstName}` : 'Thank you'}</p>
        <h2 id="summary-heading" className="h-section mt-4">
          Your Project Summary
        </h2>
        <p className="text-lead mt-5 max-w-2xl">
          Here is what we understand about your project. A member of our team reviews this personally and will bring
          your investment range to the conversation.
        </p>

        <dl className="surface-card mt-10 divide-y divide-border-subtle">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:gap-8">
              <dt className="field-label sm:w-40 sm:shrink-0">{label}</dt>
              <dd className="text-cream">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The homeowner's own uncertainties, turned into an agenda rather than
          left as gaps. This is the most useful thing on the page. */}
      {questions.length > 0 && (
        <section aria-labelledby="agenda-heading">
          <h2 id="agenda-heading" className="h-section">
            Worth Settling Together
          </h2>
          <p className="text-lead mt-5 max-w-2xl">
            You told us you were not sure about a few things. That is completely normal, and these are exactly the
            questions that shape the investment.
          </p>
          <ul className="mt-8 space-y-4">
            {questions.map((q) => (
              <li key={q} className="surface-card p-6 text-cream">
                {q}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="next-heading">
        <h2 id="next-heading" className="h-section">
          What Happens Next
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              n: '01',
              t: 'We Reply Within One Business Day',
              b: 'A member of our team reads this personally. You will hear back from a person, not an autoresponder.',
            },
            {
              n: '02',
              t: 'A Short Conversation',
              b: 'About twenty minutes to confirm the details above and answer the questions worth settling.',
            },
            {
              n: '03',
              t: 'Your Investment Range',
              b: 'We bring the numbers to that conversation, based on your actual home rather than an average.',
            },
          ].map((s) => (
            <div key={s.n} className="surface-card p-8">
              <div className="font-sans text-4xl tracking-brand text-cream/40">{s.n}</div>
              <h3 className="h-card mt-6">{s.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact/" className="btn-primary">
            Book a Consultation
          </Link>
          <a href={site.phoneHref} className="btn-secondary">
            Call {site.phone}
          </a>
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-text-muted">
          We do not publish an automated price for a project like yours. Every home, site, and set of selections is
          different, and a number produced without seeing them would be a guess. Your range comes from a person who has
          reviewed your details.
        </p>
      </section>
    </div>
  );
}
