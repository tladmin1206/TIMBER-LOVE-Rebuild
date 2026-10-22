/**
 * GA4 questionnaire funnel events (Entity: Timber and Love).
 *
 * Events, sent through the existing gtag (GT-P3NNWV8, which feeds GA4
 * G-NMQT3GQEE9, property 364097880):
 *   questionnaire_start   first field interaction, once per page view per form
 *   questionnaire_step    each step reached, with step_number
 *   questionnaire_submit  only after the server confirms success
 *
 * Every event carries form_id, page_path, source_page and device_category.
 * Never pass entered values or anything that identifies a person.
 * No-op when gtag is absent, on the server, or when the visitor sends
 * Do Not Track or Global Privacy Control (same rule as lib/analytics.ts).
 */
export type DeviceCategory = 'mobile' | 'tablet' | 'desktop';

export function deviceCategory(): DeviceCategory {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|iPod|Android.*Mobile/i.test(ua)) return 'mobile';
  const w = window.innerWidth || 1024;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

type QEvent = 'questionnaire_start' | 'questionnaire_step' | 'questionnaire_submit';

// Once per page view: module state resets on every full load, and the key
// includes the path so client-side navigation counts as a new page view.
const startedKeys = new Set<string>();
const stepKeys = new Set<string>();

function send(name: QEvent, formId: string, extra: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.doNotTrack === '1' || nav.globalPrivacyControl) return false;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return false;
  const path = window.location.pathname;
  try {
    gtag('event', name, {
      form_id: formId,
      page_path: path,
      source_page: path,
      device_category: deviceCategory(),
      ...extra,
    });
  } catch {
    return false;
  }
  return true;
}

/** Call on the first field interaction. Also emits questionnaire_step 1. */
export function trackQuestionnaireStart(formId: string) {
  const key = `${formId}|${typeof window === 'undefined' ? '' : window.location.pathname}`;
  if (startedKeys.has(key)) return;
  startedKeys.add(key);
  send('questionnaire_start', formId);
  trackQuestionnaireStep(formId, 1);
}

/** Once per step number per page view. */
export function trackQuestionnaireStep(formId: string, stepNumber: number) {
  const key = `${formId}|${typeof window === 'undefined' ? '' : window.location.pathname}|${stepNumber}`;
  if (stepKeys.has(key)) return;
  stepKeys.add(key);
  send('questionnaire_step', formId, { step_number: stepNumber });
}

/** Call only after the API response confirms success. Never on errors. */
export function trackQuestionnaireSubmit(formId: string) {
  send('questionnaire_submit', formId);
}
