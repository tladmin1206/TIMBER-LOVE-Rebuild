'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { trackQuestionnaireStart, trackQuestionnaireStep, trackQuestionnaireSubmit } from '@/lib/questionnaireAnalytics';

const FORM_ID = 'design_build_questionnaire';

const FORM_ORIGIN = 'https://leads.timberandlove.com';
export const DESIGN_BUILD_FORM_URL = `${FORM_ORIGIN}/forms/combined?transparent=true`;

/** The same live questionnaire used on timberandlove.com, including its lead workflow. */
export default function DesignBuildQuestionnaire() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(560);
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
        setHeight(Math.ceil(data.height));
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
      {!ready && !delayed && <p role="status" className="mb-4 text-center text-sm text-text-secondary">Loading your project questionnaire…</p>}
      {!ready && delayed && <p role="status" className="mb-4 text-sm leading-relaxed text-text-secondary">The questionnaire is taking a little longer to load. You can open it directly below or call <a href={site.phoneHref} className="underline underline-offset-4">{site.phone}</a>.</p>}
      <iframe ref={frame} src={DESIGN_BUILD_FORM_URL} title="Timber + Love Design + Build Project Questionnaire"
        className="block w-full border-0 bg-transparent" style={{ height, colorScheme: 'dark' }} />
      <p className="mt-5 text-center text-xs leading-relaxed text-text-secondary">
        Prefer a separate window?{' '}
        <a href={DESIGN_BUILD_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">Open the questionnaire ↗</a>
      </p>
    </div>
  );
}
