/* eslint-disable no-console */
/**
 * Narrative validation checks. Spec Part II § 14:
 * "LLM output validation catches and rejects any injected figure; verified
 * with adversarial test cases."
 *
 * Run: npx tsx scripts/verify-planner-narrative.ts
 */
import { validateNarrative, type NarrativePayload } from '../lib/planner/narrative/validate';
import { generateNarrative, templateNarrative } from '../lib/planner/narrative/generate';
import type { Estimate, PlannerAnswers } from '../lib/planner/types';

let failures = 0;
function check(name: string, cond: boolean, detail = '') {
  if (cond) console.log(`  PASS  ${name}`);
  else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? `: ${detail}` : ''}`);
  }
}

const payload: NarrativePayload = {
  rangeLow: '$185,000',
  rangeHigh: '$320,000',
  rangeMid: '$270,000',
  confidenceLabel: 'Good',
  designWeeks: '6 to 10 weeks',
  constructionWeeks: '10 to 16 weeks',
  contingencyPct: '11%',
};

console.log('\nAccepts prose that only restates the payload');
{
  const good = 'Your project typically falls between $185,000 and $320,000, with most landing near $270,000. Allow 6 to 10 weeks for design and 10 to 16 weeks for construction. An 11% contingency is included.';
  check('faithful narrative is accepted', validateNarrative(good, payload).ok === true);

  const noFigures = 'This is a planning range rather than a quote. Your final investment is settled after design and site evaluation.';
  check('prose with no figures at all is accepted', validateNarrative(noFigures, payload).ok === true);
}

console.log('\nAdversarial cases: every one must be rejected');
{
  const cases: [string, string][] = [
    ['invented a total', 'Your project will cost about $412,000 in total.'],
    ['invented a lower bound', 'Projects like this start around $95,000.'],
    ['shorthand smuggling', 'Expect roughly $250k for this scope.'],
    ['millions shorthand', 'A build of this calibre runs $1.2M.'],
    ['invented percentage', 'We include a 25% contingency on projects like yours.'],
    ['invented duration weeks', 'Construction usually takes 30 weeks from start to finish.'],
    ['invented duration months', 'Plan for about 9 months of construction.'],
    ['plausible but absent midpoint', 'Most homeowners land near $260,000.'],
    ['ROI claim with a figure', 'You should recoup around 78% of this at resale.'],
    ['figure inside a longer sentence', 'Because the panel may need upgrading, budget a further $7,500 on top.'],
  ];

  for (const [label, text] of cases) {
    const v = validateNarrative(text, payload);
    check(`rejects: ${label}`, v.ok === false, v.ok ? 'accepted when it should not have been' : '');
  }
}

console.log('\nEdge cases that must NOT false-positive');
{
  // Numbers that are not figures should not trip the validator.
  const counts = 'We flagged two assumptions and three exclusions for your consultation.';
  check('plain counts are not treated as figures', validateNarrative(counts, payload).ok === true);

  const year = 'Your home was built in 1961, which shapes several of our assumptions.';
  check('a year is not treated as currency', validateNarrative(year, payload).ok === true);

  // Payload figures restated without formatting must still pass.
  const unformatted = 'The range runs from $185,000 to $320,000.';
  check('payload figures restated verbatim pass', validateNarrative(unformatted, payload).ok === true);
}

console.log('\nFail-closed behaviour');
{
  const estimate = {
    outcome: 'ok',
    range: { low: 185_000, mid: 270_000, high: 320_000 },
    confidence: { score: 100, label: 'Good', bandWidth: 0.18, inputsUsed: 8, inputsTotal: 8, reasons: [], wouldTighten: [] },
    durationWeeks: { low: 10, high: 16 },
    designWeeks: { low: 6, high: 10 },
    transparency: { inclusions: [], assumptions: [], exclusions: [], allowances: [], variables: [] },
    overImprovement: false,
    overImprovementRatio: null,
    belowMinimum: false,
    trace: { contingencyPct: 0.11 } as never,
    diagnostics: [],
  } as unknown as Estimate;

  const answers: PlannerAnswers = { mode: 'A', projectType: 'kitchen', scopeLevel: 'reimagine', finishTier: 'elevated' };

  (async () => {
    const noModel = await generateNarrative(estimate, answers);
    check('with no model configured, the template is used', noModel.source === 'template');
    check('the template contains only payload figures', validateNarrative(noModel.summary, {
      ...payload,
      contingencyPct: '11%',
    }).ok === true);

    const liar = await generateNarrative(estimate, answers, async () => 'This will run about $412,000 over 30 weeks.');
    check('a lying model is rejected', liar.source === 'template');
    check('rejection records the offending tokens', (liar.rejected?.tokens.length ?? 0) >= 2, JSON.stringify(liar.rejected));

    const thrower = await generateNarrative(estimate, answers, async () => {
      throw new Error('upstream down');
    });
    check('a failing model call falls back rather than erroring', thrower.source === 'template');

    const honest = await generateNarrative(
      estimate,
      answers,
      async () => 'Your kitchen sits between $185,000 and $320,000, with most projects near $270,000.'
    );
    check('an honest model response is used', honest.source === 'llm');

    console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) failed.`}\n`);
    process.exit(failures === 0 ? 0 : 1);
  })();
}
