'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Estimate, TransparencyBlocks } from '@/lib/planner/types';

/**
 * The results experience. Spec Part II § 7.
 *
 * Revealed in three beats rather than dumped: the range, what it covers, and
 * what happens next. Each beat is a distinct section so the page can be read
 * rather than scanned in panic.
 */
export default function Results({
  estimate,
  consultationQuestions,
}: {
  estimate: Estimate;
  consultationQuestions: string[];
}) {
  if (estimate.outcome === 'below-minimum') return <BelowMinimum />;
  if (estimate.outcome !== 'ok' || !estimate.range) return <RangeUnavailable estimate={estimate} />;

  return (
    <div className="space-y-20 sm:space-y-28">
      <RangeCard estimate={estimate} />
      <Transparency blocks={estimate.transparency} />
      <NextSteps questions={consultationQuestions} />
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Beat 1, the range. Large, calm, singular.
 * ---------------------------------------------------------------- */

function RangeCard({ estimate }: { estimate: Estimate }) {
  const r = estimate.range!;
  const c = estimate.confidence;

  return (
    <section aria-labelledby="range-heading">
      <p className="eyebrow">Your Planning Report</p>
      <h2 id="range-heading" className="h-section mt-4">
        Planning Investment Range
      </h2>

      <div className="surface-card mt-10 p-8 sm:p-12">
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="stat-figure">{money(r.low)}</span>
          <span className="text-2xl text-text-muted">-</span>
          <span className="stat-figure">{money(r.high)}</span>
        </p>

        {/* Never presented as "your estimate". */}
        <p className="mt-6 text-sm text-text-secondary">
          Typical for this project: <span className="text-cream">{money(r.mid)}</span>
        </p>

        <div className="mt-8 border-t border-border-subtle pt-6">
          <p className="flex items-center gap-3">
            <span aria-hidden="true" className="text-cream">
              {dots(c.label)}
            </span>
            <span className="text-sm text-cream">Confidence: {c.label}</span>
            <span className="text-sm text-text-muted">
              Based on {c.inputsUsed} of {c.inputsTotal} planning inputs
            </span>
          </p>

          {c.wouldTighten.length > 0 && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {c.wouldTighten.length === 1 ? 'One thing would tighten this range' : 'A few things would tighten this range'}:{' '}
              {joinNaturally(c.wouldTighten.map(lowerFirst))}. {c.wouldTighten.length === 1 ? 'That is' : 'Those are'} a
              first-consultation conversation.
            </p>
          )}
        </div>

        {/* Homeowners consistently underestimate the front end, so design and
            permitting time is shown separately from construction. */}
        {estimate.durationWeeks && estimate.designWeeks && (
          <dl className="mt-8 grid gap-6 border-t border-border-subtle pt-6 sm:grid-cols-2">
            <div>
              <dt className="field-label">Design and planning</dt>
              <dd className="mt-2 text-lg text-cream">
                {estimate.designWeeks.low} to {estimate.designWeeks.high} weeks
                <span className="block text-sm text-text-muted">before construction begins</span>
              </dd>
            </div>
            <div>
              <dt className="field-label">Construction</dt>
              <dd className="mt-2 text-lg text-cream">
                {estimate.durationWeeks.low} to {estimate.durationWeeks.high} weeks
              </dd>
            </div>
          </dl>
        )}
      </div>

      {estimate.overImprovement && <OverImprovement ratio={estimate.overImprovementRatio} />}

      <p className="mt-6 max-w-2xl text-xs leading-relaxed text-text-muted">
        This is a planning range, not a bid, quote, or proposal. Your final investment is set after design
        development, engineering, site evaluation, and final selections.
      </p>
    </section>
  );
}

/** § 7.4, the advisory a good project manager gives and a calculator never does. */
function OverImprovement({ ratio }: { ratio: number | null }) {
  return (
    <aside className="alert mt-8 max-w-2xl">
      <p className="text-cream">A note on value.</p>
      <p className="mt-2 leading-relaxed">
        This range represents roughly {ratio ? Math.round(ratio * 100) : '-'}% of your home&apos;s current estimated
        value, which is above the typical range for this neighbourhood. It can still be exactly the right decision for
        a forever home. It is a different decision if you are planning to sell within five years. Worth talking
        through.
      </p>
    </aside>
  );
}

/* ---------------------------------------------------------------- *
 * Beat 2: what it covers.
 * ---------------------------------------------------------------- */

function Transparency({ blocks }: { blocks: TransparencyBlocks }) {
  // Homeowner view is range-only: the qualitative lists stay, but no per-item
  // or per-category dollar figures are shown (no allowances breakdown, no
  // "impact if wrong", no exclusion or variable magnitudes). All of that detail
  // is preserved for the internal project-manager email, never shown here, so
  // the homeowner sees a single total range and nothing that reads as an
  // itemized cost breakdown.
  const sections = [
    { id: 'included', title: 'What’s included', count: blocks.inclusions.length },
    { id: 'assumed', title: 'What we assumed', count: blocks.assumptions.length },
    { id: 'excluded', title: 'What’s not included', count: blocks.exclusions.length },
    { id: 'variables', title: 'What could move this', count: blocks.variables.length },
  ].filter((s) => s.count > 0);

  const [open, setOpen] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <section aria-labelledby="covers-heading">
      <h2 id="covers-heading" className="h-section">
        What This Covers
      </h2>
      <div className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
        {sections.map((s) => {
          const isOpen = open === s.id;
          return (
            <div key={s.id}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                  aria-controls={`block-${s.id}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base text-cream sm:text-lg">{s.title}</span>
                  <span aria-hidden="true" className="shrink-0 text-xl leading-none text-cream/70">
                    {isOpen ? '–' : '+'}
                  </span>
                </button>
              </h3>
              <div id={`block-${s.id}`} hidden={!isOpen} className="pb-6">
                {s.id === 'included' && (
                  <ul className="space-y-3">
                    {blocks.inclusions.map((i, n) => (
                      <li key={n} className="text-sm leading-relaxed text-text-secondary">
                        <span className="text-xs uppercase tracking-[0.14em] text-text-muted">{i.trade}</span>
                        <span className="mt-1 block text-cream">{i.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* The block that earns the trust: every assumption cites its
                    source and what it costs if it is wrong. */}
                {s.id === 'assumed' && (
                  <ul className="space-y-5">
                    {blocks.assumptions.map((a, n) => (
                      <li key={n} className="text-sm leading-relaxed">
                        <p className="text-cream">{a.text}</p>
                        {a.sourceDetail && <p className="mt-1 text-text-muted">{a.sourceDetail}</p>}
                        {a.flaggedForVerification && (
                          <p className="mt-1">
                            <span className="badge">Worth confirming on the walkthrough</span>
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {s.id === 'excluded' && (
                  <ul className="space-y-3">
                    {blocks.exclusions.map((x, n) => (
                      <li key={n} className="text-sm leading-relaxed text-text-secondary">
                        {x.text}
                      </li>
                    ))}
                  </ul>
                )}

                {s.id === 'variables' && (
                  <ul className="space-y-3">
                    {blocks.variables.map((v, n) => (
                      <li key={n} className="text-sm leading-relaxed text-text-secondary">
                        {v.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Beat 3: what happens next.
 * ---------------------------------------------------------------- */

/**
 * § 5.5: asked after the range, never before it.
 *
 * Asking for a budget up front suppresses completion, anchors low, and makes a
 * homeowner feel qualified rather than helped. Asking for a reaction afterwards
 * gets a higher response rate, better data, and gives the project manager the
 * most useful sentence in the brief. It also opens the value-engineering
 * conversation naturally rather than adversarially.
 */
function BudgetReaction() {
  const [answer, setAnswer] = useState<string | null>(null);

  const options = [
    { value: 'expected', label: 'About what I expected' },
    { value: 'higher', label: 'Higher than I hoped' },
    { value: 'lower', label: 'Lower than I expected' },
    { value: 'discuss', label: 'I’d rather discuss it' },
  ];

  if (answer) {
    return (
      <div className="surface-card p-8" role="status">
        <p className="text-cream">Thank you, that is genuinely useful.</p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {answer === 'higher'
            ? 'We will come to the call with options for phasing and where the money does the most work.'
            : answer === 'lower'
              ? 'We will come to the call with what a step up in finish or scope would actually buy you.'
              : 'Your project manager will have this in front of them before the call.'}
        </p>
      </div>
    );
  }

  return (
    <div className="surface-card p-8">
      <p className="field-label">One last question</p>
      <p className="mt-3 text-lg text-cream">Does this range fit what you had in mind?</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => setAnswer(o.value)}
            className="border border-border-subtle p-4 text-left text-sm text-cream transition-colors hover:border-cream"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function NextSteps({ questions }: { questions: string[] }) {
  return (
    <section aria-labelledby="next-heading">
      <h2 id="next-heading" className="h-section">
        What Happens Next
      </h2>

      <div className="mt-10">
        <BudgetReaction />
      </div>

      {questions.length > 0 && (
        <div className="surface-card mt-10 p-8">
          <p className="field-label">Questions to bring to your consultation</p>
          <ul className="mt-4 space-y-3">
            {questions.map((q) => (
              <li key={q} className="text-sm leading-relaxed text-text-secondary">
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-text-muted">
            These come from the things you told us you were not sure about. They are the fastest way to narrow the
            range.
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/contact/" className="btn-primary">
          Book a Design Consultation
        </Link>
        <Link href="/timber-and-love-gallery/" className="btn-secondary">
          See Our Work
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Non-range outcomes
 * ---------------------------------------------------------------- */

/** § 7.5: honest, fast, and it saves the project manager a call. */
function BelowMinimum() {
  return (
    <section className="surface-card p-8 sm:p-12">
      <h2 className="h-section">This One May Not Be Ours</h2>
      <p className="text-lead mt-5 max-w-xl">
        Based on what you have described, this project is likely smaller than the work we take on. We would rather
        tell you now than take a meeting that wastes your afternoon.
      </p>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
        If the scope grows, or you would like a recommendation for someone better suited to it, we are happy to point
        you in the right direction.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/contact/" className="btn-primary">
          Ask for a Recommendation
        </Link>
        <Link href="/timber-and-love-gallery/" className="btn-secondary">
          See Our Work
        </Link>
      </div>
    </section>
  );
}

/**
 * Shown when the engine declines to publish a figure, an unsigned band table,
 * a project type with no approved band, or confidence below the floor. The
 * homeowner is never told a number we cannot stand behind.
 */
function RangeUnavailable({ estimate }: { estimate: Estimate }) {
  const tooUncertain = estimate.outcome === 'confidence-too-low';
  return (
    <section className="surface-card p-8 sm:p-12">
      <h2 className="h-section">Let’s Put a Number on This Together</h2>
      <p className="text-lead mt-5 max-w-xl">
        {tooUncertain
          ? 'There is enough still open on this project that any range we published would be too wide to be useful. A short conversation would narrow it quickly.'
          : 'This project needs a conversation before we can put a range on it honestly. Everything you told us is saved and will be with our team.'}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/contact/" className="btn-primary">
          Talk to Our Team
        </Link>
        <Link href="/timber-and-love-gallery/" className="btn-secondary">
          See Our Work
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function money(v: number): string {
  return `$${Math.round(v).toLocaleString('en-US')}`;
}

function dots(label: string): string {
  switch (label) {
    case 'Strong':
      return '●●●●';
    case 'Good':
      return '●●●○';
    case 'Directional':
      return '●●○○';
    default:
      return '●○○○';
  }
}

function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function joinNaturally(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}
