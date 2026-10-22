/** localStorage key for the cookie banner choice. No cookie of our own. */
export const CONSENT_KEY = 'tl_consent';

/**
 * notice: analytics load until the visitor declines (the default, pending
 * legal review). opt-in: analytics stay off until Accept.
 * Set NEXT_PUBLIC_CONSENT_MODE=opt-in to require a grant. Any other value,
 * including an unset variable, is notice.
 */
export const CONSENT_MODE: 'notice' | 'opt-in' =
  process.env.NEXT_PUBLIC_CONSENT_MODE === 'opt-in' ? 'opt-in' : 'notice';

export type ConsentChoice = 'granted' | 'denied';

export function storedConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function analyticsAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return false;
  const choice = storedConsent();
  if (choice === 'denied') return false;
  if (choice === 'granted') return true;
  return CONSENT_MODE === 'notice';
}

/** Only category values belong here. Never send entered fields or personal data. */
export function trackEvent(name: string, values: Record<string, string | number> = {}) {
  if (!analyticsAllowed()) return;
  window.gtag?.('event', name, { page_path: window.location.pathname, ...values });
}
