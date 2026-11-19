'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { trackQuestionnaireStart, trackQuestionnaireStep, trackQuestionnaireSubmit } from '@/lib/questionnaireAnalytics';

const FORM_ID = 'design_build_questionnaire';

const FORM_ORIGIN = 'https://leads.timberandlove.com';
/**
 * Embedded version. `transparent=true` makes the form draw white type with no
 * background of its own, so it is designed to sit directly on the site's ink.
 * Shown on its own in a browser tab it is white on white, so it is only ever
 * used inside the frame below.
 */
export const DESIGN_BUILD_FORM_URL = `${FORM_ORIGIN}/forms/combined?transparent=true`;
/** Standalone version with its own background, for the open-in-new-window link. */
export const DESIGN_BUILD_FORM_DIRECT_URL = `${FORM_ORIGIN}/forms/combined`;

/**
 * Height of the hosted form's own logo band, cropped out of view.
 *
 * The form opens every step with a dark Timber + Love logo that all but
 * vanishes on the site's ink, and our page already carries the brand mark in
 * its header. Measured on the live form at 320 to 606px wide and across its
 * first steps: the logo always sits 16 to 80px from the top and the step's
 * content always starts at 96px. Cropping 84px removes the logo and keeps the
 * content's top margin. If the hosted form's layout ever changes, revisit
 * this value (or remove the logo there and set this to 0).
 */
const LOGO_CROP = 84;

/** The same live questionnaire used on timberandlove.com, including its lead workflow. */
export default function DesignBuildQuestionnaire() {
  const frame = useRef<HTMLIFrameElement>(null);
  const box = useRef<HTMLDivElement>(null);
  // Close to the welcome step's real height, so the page barely moves when
  // the form reports in.
  const [height, setHeight] = useState(460);
  const lastHeight = useRef(0);
  const [ready, setReady] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const reported = useRef(new Set<string>());

  useEffect(() => {
    const timer = window.setTimeout(() => setDelayed(true), 12000);
    function receive(event: MessageEvent) {
      if (event.origin !== FORM_ORIGIN || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'resize' && typeof data.height === 'number' && Number.isFinite(data.height) && data.height >= 200 && data.height <= 12000) {
        // Use the exact reported size. Adding padding here can cause a resize loop.
        const next = Math.ceil(data.height);
        // A new step (or the step's errors after Next): if the visitor has
        // scrolled past the top of the form, bring the top back into view, as
        // an app would. Changes of a few pixels are left alone so nobody is
        // pulled away from the field they are typing in.
        if (lastHeight.current && Math.abs(next - lastHeight.current) >= 20) bringIntoView();
        lastHeight.current = next;
        setHeight(next);
        setReady(true);
        window.clearTimeout(timer);
      }
      if (data.type === 'timber:lead-submitted' && data.form === 'combined' && typeof data.submissionId === 'string' && !reported.current.has(data.submissionId)) {
        reported.current.add(data.submissionId);
        // The leads app posts this only after its server stored the lead.
        trackQuestionnaireSubmit(FORM_ID);
        if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
        window.gtag?.('event', 'generate_lead', { form_name: 'design_build_questionnaire', page_path: window.location.pathname });
      }
      // Optional: if the leads app posts { type: 'timber:lead-step', form: 'combined', step: n },
      // record the step. Until it does, only step 1 is emitted (on start).
      if (data.type === 'timber:lead-step' && data.form === 'combined' && Number.isInteger(data.step) && data.step >= 1 && data.step <= 50) {
        trackQuestionnaireStep(FORM_ID, data.step);
      }
    }
    function bringIntoView() {
      const el = box.current;
      if (!el) return;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
      const top = el.getBoundingClientRect().top;
      if (top >= header) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: window.scrollY + top - header - 8, behavior: reduce ? 'auto' : 'smooth' });
    }
    // The form is a cross-origin iframe, so field events are not visible here.
    // Focus moving into the iframe (window blur with the iframe active) is the
    // first field interaction we can observe.
    function onBlur() {
      window.setTimeout(() => {
        if (document.activeElement === frame.current) trackQuestionnaireStart(FORM_ID);
      }, 0);
    }
    window.addEventListener('blur', onBlur);
    window.addEventListener('message', receive);
    return () => { window.clearTimeout(timer); window.removeEventListener('blur', onBlur); window.removeEventListener('message', receive); };
  }, []);

  return (
    <div className="w-full min-w-0">
      {!ready && !delayed && <p role="status" className="mb-4 px-5 text-center text-sm text-text-secondary">Loading your project questionnaire…</p>}
      {!ready && delayed && <p role="status" className="mb-4 px-5 text-sm leading-relaxed text-text-secondary">The questionnaire is taking a little longer to load. You can open it directly below or call <a href={site.phoneHref} className="underline underline-offset-4">{site.phone}</a>.</p>}
      {/* No color-scheme on the frame. A dark scheme here made the browser paint
          an opaque white backdrop behind the transparent form (its scheme is
          light) and told the form the visitor prefers dark mode, so its white
          type and icons disappeared into a white box. Left alone, the frame is
          transparent and the form sits on the ink exactly as it does on
          timberandlove.com. */}
      <div ref={box} className="overflow-hidden" style={{ height: Math.max(0, height - LOGO_CROP) }}>
        <iframe ref={frame} src={DESIGN_BUILD_FORM_URL} title="Timber + Love Design + Build Project Questionnaire"
          className="block w-full border-0 bg-transparent" style={{ height, marginTop: -LOGO_CROP }} allow="clipboard-write" />
      </div>
      <p className="mt-2 px-5 text-center text-xs leading-relaxed text-text-muted">
        Prefer a separate window?{' '}
        <a href={DESIGN_BUILD_FORM_DIRECT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">Open the questionnaire ↗</a>
      </p>
    </div>
  );
}
