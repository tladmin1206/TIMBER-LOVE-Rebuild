/**
 * Phone normalisation for CRM writes.
 *
 * Lives here rather than being imported from the planner's GHL module: the
 * live lead path should not depend on a CRM integration the business is not
 * using. The planner copy stays where it is, unreachable behind the retired
 * planner API, until that code's fate is decided.
 */

/** Accept any format a homeowner types; normalise to E.164 for the CRM. */
export function toE164(raw: string, defaultCountry = '1'): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `+${defaultCountry}${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  // Anything else is passed through with a plus, rather than silently mangled
  // into a wrong number. A CRM rejecting it is better than a team calling it.
  return `+${digits}`;
}
