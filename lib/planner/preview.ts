/**
 * Internal preview mode.
 *
 * The sign-off gate (§ 9) means the planner cannot show a figure until
 * Appendix A is signed. But the acceptance criteria (§ 14) require moderated
 * testing with eight or more real homeowners *before* launch, and the flow
 * cannot be timed if it refuses to run. Preview mode resolves that.
 *
 * What it does: runs the engine against the draft table so the flow is
 * walkable end to end.
 *
 * What it does not do: make the result publishable. Every figure produced in
 * preview is labelled as placeholder pricing on screen, the page stays
 * `noindex`, and preview is off unless the environment explicitly asks for it.
 *
 * Enable with PLANNER_PREVIEW=1 on a staging environment. Never set it in
 * production, the whole point of § 9 is that no flag turns real pricing on
 * except a signed Appendix A.
 */
export function isPlannerPreview(): boolean {
  return process.env.PLANNER_PREVIEW === '1';
}

/** Copy shown wherever a preview figure appears. Deliberately unmissable. */
export const PREVIEW_NOTICE =
  'Placeholder pricing. These figures are draft values pending business sign-off and must not be quoted to a client.';
