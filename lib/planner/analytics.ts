/**
 * Planner analytics. Spec Part II § 13.
 *
 * Fired to GA4 and, in Phase 2, to a first-party events table: GA4 cannot do
 * the accuracy and attribution analysis with the fidelity needed.
 *
 * The two highest-value events are `not_sure_selected` and `gate_abandoned`.
 * The first tells you which questions are badly written; the second tells you
 * what the gate costs. Everything else is context for those two.
 */

export type PlannerEvent =
  | { name: 'planner_started' }
  | { name: 'mode_selected'; mode: string }
  | { name: 'address_entered' }
  | { name: 'enrichment_succeeded'; source: string }
  | { name: 'enrichment_failed'; reason: string }
  | { name: 'property_confirmed' }
  | { name: 'property_corrected' }
  | { name: 'screen_viewed'; screenId: string; elapsedMs: number }
  | { name: 'question_answered'; questionId: string; value: string }
  | { name: 'not_sure_selected'; questionId: string }
  | { name: 'back_pressed'; screenId: string }
  | { name: 'save_for_later_requested' }
  | { name: 'gate_reached' }
  | { name: 'gate_submitted' }
  | { name: 'gate_abandoned'; screenId: string }
  | { name: 'results_viewed'; outcome: string }
  | { name: 'transparency_block_expanded'; blockId: string }
  | { name: 'budget_reaction_submitted'; reaction: string }
  | { name: 'report_downloaded' }
  | { name: 'consultation_clicked' };

type Gtag = (command: 'event', name: string, params?: Record<string, unknown>) => void;

/**
 * Fires an event. Silent and non-throwing by design: analytics must never be
 * able to break the flow it is measuring.
 */
export function track(event: PlannerEvent, sessionId?: string): void {
  const { name, ...params } = event;
  try {
    const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
    if (typeof w.gtag === 'function') {
      w.gtag('event', name, { ...params, planner_session_id: sessionId });
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...params, planner_session_id: sessionId });
    }
  } catch {
    /* analytics is never load-bearing */
  }
}

/** Stable per-visitor session id, persisted so a return visit stitches (§ 6.4). */
export function sessionId(): string {
  const KEY = 'tl-planner-session';
  try {
    const existing = window.localStorage.getItem(KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.localStorage.setItem(KEY, id);
    return id;
  } catch {
    // Private browsing or storage disabled, a per-load id still lets events
    // within this session be correlated.
    return 'ephemeral';
  }
}
