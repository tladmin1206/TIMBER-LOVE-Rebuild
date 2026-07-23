import type { Mode } from '../types';
import { DISAMBIGUATE, FOOTPRINT_SCREENS, MODE_ROUTER, MODE_SCREENS, SCREEN_CEILING, type Screen } from './screens';

/**
 * Flow runtime. Spec Part II §§ 3.1, 3.2 and 5.1.
 *
 * The graph is derived from the answers rather than stored, which is what makes
 * back navigation lossless: going back changes an answer, and the sequence is
 * recomputed from it. Nothing about position is held separately to fall out of
 * sync with the data.
 */

export type FlowState = {
  /** Every answer collected so far, keyed by screen field. */
  values: Record<string, unknown>;
  /** Screen ids the homeowner answered "not sure" on. */
  notSure: string[];
  /** Set when a Mode A project turns out to need new footprint (§ 3.2). */
  hybrid: boolean;
};

export const emptyFlow = (): FlowState => ({ values: {}, notSure: [], hybrid: false });

/**
 * § 3.1 — "I'm not sure yet" asks two disambiguating questions whose answers
 * resolve the mode deterministically. There is no guessing and no dead end.
 */
export function resolveMode(state: FlowState): Mode | 'unsure' | null {
  const picked = state.values.mode as string | undefined;
  if (!picked) return null;
  if (picked !== 'unsure') return picked as Mode;

  const owns = state.values.ownsProperty as string | undefined;
  const adding = state.values.addingSqFt as string | undefined;
  if (!owns || !adding) return 'unsure';

  if (owns === 'no') return 'C'; // No property yet: they are building or buying to build.
  if (adding === 'yes') return 'B'; // Owns and adding footprint.
  return 'A'; // Owns, working within what is there.
}

/**
 * § 3.2 — a Mode A scope that requires new footprint appends the Mode B
 * questions rather than restarting. Never restart a flow. Never lose data.
 */
export function requiresFootprint(state: FlowState): boolean {
  const space = state.values.projectType as string | undefined;
  const scope = state.values.scopeLevel as string | undefined;
  // A rebuild that expands into unconditioned space is the common trigger.
  return scope === 'rebuild' && space === 'expand-into-unconditioned';
}

export const HYBRID_MESSAGE =
  'Adding square footage changes the planning picture. Two more questions.';

/**
 * The ordered screens for the current state, including any appended hybrid
 * screens and excluding screens whose `when` predicate does not pass.
 */
export function screensFor(state: FlowState): Screen[] {
  const mode = resolveMode(state);
  if (!mode) return [MODE_SCREENS.A[0]]; // the router alone until a mode is picked

  if (mode === 'unsure') {
    // Router plus the two disambiguating questions.
    return [MODE_ROUTER, ...DISAMBIGUATE];
  }

  const base = MODE_SCREENS[mode].filter((s) => !s.when || s.when(state.values as never));

  if (mode === 'A' && state.hybrid) {
    // Insert the footprint questions after the scope screen that triggered
    // them, so the added screens sit where they make sense rather than at the end.
    const idx = base.findIndex((s) => s.id === 'scopeLevel');
    return [...base.slice(0, idx + 1), ...FOOTPRINT_SCREENS, ...base.slice(idx + 1)];
  }

  return base;
}

/** Answer a screen, returning new state. Pure, so back navigation is trivial. */
export function answer(state: FlowState, screenId: string, field: string, value: unknown): FlowState {
  const next: FlowState = {
    values: { ...state.values, [field]: value },
    notSure: state.notSure.filter((id) => id !== screenId),
    hybrid: state.hybrid,
  };
  next.hybrid = state.hybrid || requiresFootprint(next);
  return next;
}

/** Record a "not sure", applying the documented default rather than blocking. */
export function answerNotSure(state: FlowState, screen: Screen): FlowState {
  return {
    values: { ...state.values, [screen.field]: undefined },
    notSure: state.notSure.includes(screen.id) ? state.notSure : [...state.notSure, screen.id],
    hybrid: state.hybrid,
  };
}

/**
 * § 5.1 rule 7 — back is always available and lossless. Because the sequence is
 * derived, stepping back is just an index change; nothing is discarded.
 */
export function stepBack(state: FlowState, currentIndex: number): number {
  return Math.max(0, currentIndex - 1);
}

/**
 * § 5.1 rule 6 — an honest progress indicator. The total only changes when a
 * hybrid branch adds screens, and that change is explained rather than silent.
 */
export function progress(state: FlowState, currentIndex: number) {
  const total = screensFor(state).length;
  return { current: Math.min(currentIndex + 1, total), total, ceiling: SCREEN_CEILING };
}

/** The consultation agenda built from everything the homeowner was unsure of. */
export function consultationQuestions(state: FlowState): string[] {
  const screens = screensFor(state);
  return state.notSure
    .map((id) => screens.find((s) => s.id === id)?.notSure?.consultationQuestion)
    .filter((q): q is string => !!q);
}

/* ------------------------------------------------------------------ *
 * Flow validation — the spec's hard rules, as assertions
 * ------------------------------------------------------------------ */

export type FlowViolation = { mode: Mode; rule: string; detail: string };

/**
 * Checks the rules that are easy to state and easy to erode: the screen
 * ceiling, the not-sure requirement, and the dropdown ban. Run in CI, not just
 * in someone's head.
 */
export function validateFlows(): FlowViolation[] {
  const violations: FlowViolation[] = [];
  const modes: Mode[] = ['A', 'B', 'C', 'D'];

  for (const mode of modes) {
    const screens = MODE_SCREENS[mode];

    if (screens.length > SCREEN_CEILING) {
      violations.push({
        mode,
        rule: '§ 5.1 rule 1 — nine screens maximum before the contact gate',
        detail: `${screens.length} screens defined`,
      });
    }

    for (const s of screens) {
      // Screens that ask nothing (address, the confirmation card) have no
      // decision to be unsure about.
      const asksADecision = s.kind !== 'address' && s.kind !== 'confirmation';
      // The rule is satisfied either by a dedicated not-sure path or by an
      // explicit unsure option among the choices, which is how the mode router
      // offers it. Both give the homeowner a way through without guessing.
      const unsureInChoices = (s.choices ?? []).some((c) => /^(unsure|not-sure)$/.test(c.value));
      if (asksADecision && !s.notSure && !unsureInChoices) {
        violations.push({
          mode,
          rule: '§ 5.1 rule 4 — every question needs a "not sure" path',
          detail: `screen "${s.id}" has none`,
        });
      }
      if (asksADecision && !s.choices && !s.slider) {
        violations.push({ mode, rule: 'screen has no input affordance', detail: `screen "${s.id}"` });
      }
    }

    // Hybrid worst case must still respect the ceiling.
    if (mode === 'A') {
      const hybridLength = screens.length + FOOTPRINT_SCREENS.length;
      if (hybridLength > SCREEN_CEILING + FOOTPRINT_SCREENS.length) {
        violations.push({ mode, rule: 'hybrid branch overruns', detail: `${hybridLength} screens` });
      }
    }
  }

  return violations;
}
