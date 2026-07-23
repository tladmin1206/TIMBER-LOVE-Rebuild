/* eslint-disable no-console */
/**
 * Flow checks from the spec's ease-of-use rules (Part II § 5.1) and mode
 * architecture (§ 3).
 *
 * Run: npx tsx scripts/verify-planner-flow.ts
 */
import {
  answer,
  answerNotSure,
  consultationQuestions,
  emptyFlow,
  progress,
  resolveMode,
  screensFor,
  validateFlows,
  type FlowState,
} from '../lib/planner/flow/graph';
import { FOOTPRINT_SCREENS, MODE_SCREENS, SCREEN_CEILING } from '../lib/planner/flow/screens';

let failures = 0;
function check(name: string, cond: boolean, detail = '') {
  if (cond) console.log(`  PASS  ${name}`);
  else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? `: ${detail}` : ''}`);
  }
}

console.log('\nStructural rules (§ 5.1)');
{
  const violations = validateFlows();
  check('no flow violates the declared rules', violations.length === 0);
  for (const v of violations) console.log(`        ${v.mode}: ${v.rule}: ${v.detail}`);

  for (const mode of ['A', 'B', 'C', 'D'] as const) {
    check(
      `mode ${mode} is within the ${SCREEN_CEILING}-screen ceiling`,
      MODE_SCREENS[mode].length <= SCREEN_CEILING,
      `${MODE_SCREENS[mode].length} screens`
    );
  }
}

console.log('\nNo dropdowns anywhere (§ 5.1 rule 5)');
{
  const kinds = new Set(Object.values(MODE_SCREENS).flat().map((s) => s.kind));
  check('no screen uses a dropdown input', !kinds.has('dropdown' as never));
  console.log(`        input kinds in use: ${[...kinds].join(', ')}`);
}

console.log('\nMode routing (§ 3.1)');
{
  const direct = answer(emptyFlow(), 'mode', 'mode', 'A');
  check('a direct choice resolves immediately', resolveMode(direct) === 'A');

  let unsure = answer(emptyFlow(), 'mode', 'mode', 'unsure');
  check('"not sure" does not resolve on its own', resolveMode(unsure) === 'unsure');
  check('"not sure" surfaces exactly two disambiguating questions', screensFor(unsure).length === 3);

  // Owns the property, not adding footprint → Renovate.
  let s: FlowState = answer(unsure, 'own-property', 'ownsProperty', 'yes');
  s = answer(s, 'adding-sqft', 'addingSqFt', 'no');
  check('owns + not adding resolves to Mode A', resolveMode(s) === 'A');

  // Owns, adding footprint → Expand.
  s = answer(answer(unsure, 'own-property', 'ownsProperty', 'yes'), 'adding-sqft', 'addingSqFt', 'yes');
  check('owns + adding resolves to Mode B', resolveMode(s) === 'B');

  // Does not own → Build.
  s = answer(answer(unsure, 'own-property', 'ownsProperty', 'no'), 'adding-sqft', 'addingSqFt', 'no');
  check('does not own resolves to Mode C', resolveMode(s) === 'C');
}

console.log('\nHybrid transition (§ 3.2)');
{
  let s = answer(emptyFlow(), 'mode', 'mode', 'A');
  const before = screensFor(s).length;

  s = answer(s, 'space', 'projectType', 'expand-into-unconditioned');
  s = answer(s, 'scopeLevel', 'scopeLevel', 'rebuild');

  check('hybrid flag is set', s.hybrid === true);
  const after = screensFor(s).length;
  check('screens are appended, not replaced', after === before + FOOTPRINT_SCREENS.length, `${before} → ${after}`);
  check('no entered data is lost', s.values.projectType === 'expand-into-unconditioned');

  const ids = screensFor(s).map((x) => x.id);
  const scopeIdx = ids.indexOf('scopeLevel');
  check('footprint questions land right after the screen that triggered them', ids[scopeIdx + 1] === FOOTPRINT_SCREENS[0].id);
}

console.log('\n"Not sure" never blocks progress (§ 5.1 rule 4)');
{
  let s = answer(emptyFlow(), 'mode', 'mode', 'A');
  const scope = MODE_SCREENS.A.find((x) => x.id === 'scopeLevel')!;
  const finish = MODE_SCREENS.A.find((x) => x.id === 'finishTier')!;

  s = answerNotSure(s, scope);
  s = answerNotSure(s, finish);

  check('unsure answers are recorded', s.notSure.length === 2);
  check('progress is not blocked', screensFor(s).length === MODE_SCREENS.A.length);

  const agenda = consultationQuestions(s);
  check('each becomes a consultation question', agenda.length === 2, agenda.join(' | '));
  console.log(`        agenda: ${agenda.join(' | ')}`);

  check('every unsure path documents its default', [scope, finish].every((x) => !!x.notSure?.appliesDefault));
}

console.log('\nBack navigation is lossless (§ 5.1 rule 7)');
{
  let s = answer(emptyFlow(), 'mode', 'mode', 'A');
  s = answer(s, 'space', 'projectType', 'kitchen');
  s = answer(s, 'scopeLevel', 'scopeLevel', 'rebuild');
  const snapshot = JSON.stringify(s.values);

  // Going back and re-answering the same value must not disturb anything else.
  const reanswered = answer(s, 'scopeLevel', 'scopeLevel', 'rebuild');
  check('re-answering preserves every other value', JSON.stringify(reanswered.values) === snapshot);

  // Changing an earlier answer keeps later ones rather than wiping the session.
  const changed = answer(s, 'space', 'projectType', 'bathroom');
  check('changing an earlier answer keeps later data', changed.values.scopeLevel === 'rebuild');
}

console.log('\nProgress indicator honesty (§ 5.1 rule 6)');
{
  let s = answer(emptyFlow(), 'mode', 'mode', 'A');
  const p1 = progress(s, 0);
  check('total matches the mode sequence', p1.total === MODE_SCREENS.A.length, `${p1.total}`);
  check('current is 1-based and clamped', p1.current === 1);

  s = answer(answer(s, 'space', 'projectType', 'expand-into-unconditioned'), 'scopeLevel', 'scopeLevel', 'rebuild');
  const p2 = progress(s, 0);
  check('total grows only when the hybrid branch adds screens', p2.total === p1.total + FOOTPRINT_SCREENS.length);
}

console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) failed.`}\n`);
process.exit(failures === 0 ? 0 : 1);
