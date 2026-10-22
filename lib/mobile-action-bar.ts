/** Routes that do not render the fixed mobile action bar. Keep in step with MobileBottomBar. */
export const MOBILE_BAR_HIDDEN_PREFIXES = [
  '/investment-planner',
  '/admin',
  '/design-and-build-questionnaire',
  '/privacy-policy',
  '/terms-and-conditions',
] as const;

export function hasMobileActionBar(pathname: string): boolean {
  return !MOBILE_BAR_HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
