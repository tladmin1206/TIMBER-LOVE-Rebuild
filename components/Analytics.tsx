'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * Re-creates the third-party tracking present on the live site so analytics
 * keep firing exactly as before:
 *   - Google tag (gtag.js)   GT-P3NNWV8   (added via Site Kit on WordPress)
 *   - Meta / Facebook Pixel  898896691730737
 *   - Microsoft Clarity      lpvs1f5dzy
 *
 * IDs can be overridden with env vars; the live values are the defaults so the
 * rebuild tracks identically out of the box. Scripts load `afterInteractive`
 * to keep them off the critical rendering path (better Core Web Vitals).
 *
 * Consent (ADA-NS-11): all three set non-essential cookies, so none of them
 * loads until the visitor accepts in <ConsentBanner>. The choice is kept in
 * localStorage (no cookie of our own). NEXT_PUBLIC_CONSENT_MODE=notice switches
 * to notice-only: trackers load at once and the banner just informs. Default
 * is opt-in. Which mode applies is a decision for Hank (see the PR).
 */
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GT-P3NNWV8';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '898896691730737';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'lpvs1f5dzy';

export const CONSENT_KEY = 'tl_consent';
export type Consent = 'granted' | 'denied';
const NOTICE_ONLY = process.env.NEXT_PUBLIC_CONSENT_MODE === 'notice';

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export default function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const choose = (c: Consent) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, c);
    } catch {
      /* private mode: choice lasts for this page view */
    }
    setConsent(c);
  };

  const load = NOTICE_ONLY || consent === 'granted';
  return (
    <>
      {ready && consent === null && <ConsentBanner noticeOnly={NOTICE_ONLY} onChoose={choose} />}
      {load && <Trackers />}
    </>
  );
}

function ConsentBanner({ noticeOnly, onChoose }: { noticeOnly: boolean; onChoose: (c: Consent) => void }) {
  return (
    <section
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-16 z-[90] border-t border-border-subtle bg-ink/95 p-4 text-sm text-cream md:bottom-0"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-cream/85">
          {noticeOnly
            ? 'We use cookies for analytics (Google, Meta, Microsoft Clarity) to understand how the site is used. '
            : 'We would like to use analytics cookies (Google, Meta, Microsoft Clarity) to understand how the site is used. They stay off unless you accept. '}
          <a href="/privacy-policy/" className="underline underline-offset-2">Privacy Policy</a>
        </p>
        <div className="flex shrink-0 gap-3">
          {noticeOnly ? (
            <button type="button" className="btn-primary min-h-[44px]" onClick={() => onChoose('granted')}>OK</button>
          ) : (
            <>
              <button type="button" className="btn-secondary min-h-[44px]" onClick={() => onChoose('denied')}>Decline</button>
              <button type="button" className="btn-primary min-h-[44px]" onClick={() => onChoose('granted')}>Accept</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Trackers() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      {GOOGLE_TAG_ID && (
        <>
          <Script
            id="gtag-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`}
          </Script>
        </>
      )}

      {/* Meta / Facebook Pixel */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
