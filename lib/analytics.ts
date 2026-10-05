/** Only category values belong here. Never send entered fields or personal data. */
export function trackEvent(name: string, values: Record<string, string | number> = {}) {
  if (typeof window === 'undefined' || navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  window.gtag?.('event', name, { page_path: window.location.pathname, ...values });
}
