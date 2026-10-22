'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { CONSENT_KEY, CONSENT_MODE, storedConsent, type ConsentChoice } from '@/lib/analytics';
import { hasMobileActionBar } from '@/lib/mobile-action-bar';

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
 * Consent: all three set non-essential cookies. The default mode is notice
 * (NEXT_PUBLIC_CONSENT_MODE unset or "notice"): trackers load, and Decline
 * turns them off. Set NEXT_PUBLIC_CONSENT_MODE=opt-in to keep them off until
 * Accept. The choice is kept in localStorage (no cookie of our own).
 * Which mode is the legal default is pending review; notice is the code default.
 */
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GT-P3NNWV8';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '898896691730737';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'lpvs1f5dzy';

type ConsentContextValue = {
  openSettings: () => void;
  choose: (choice: ConsentChoice) => void;
  bannerOpen: boolean;
  noticeOnly: boolean;
  settingsRequest: number;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentRoot({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [forced, setForced] = useState(false);
  const [settingsRequest, setSettingsRequest] = useState(0);

  useEffect(() => {
    setConsent(storedConsent());
    setReady(true);
  }, []);

  const choose = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* private mode: choice lasts for this page view */
    }
    setConsent(choice);
    setForced(false);
  };

  const openSettings = () => {
    setForced(true);
    setSettingsRequest((n) => n + 1);
  };

  const bannerOpen = ready && (forced || consent === null);
  const load = ready && (consent === 'granted' || (CONSENT_MODE === 'notice' && consent !== 'denied'));

  return (
    <ConsentContext.Provider
      value={{
        openSettings,
        choose,
        bannerOpen,
        noticeOnly: CONSENT_MODE === 'notice',
        settingsRequest,
      }}
    >
      {children}
      {load && <Trackers />}
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton() {
  const ctx = useContext(ConsentContext);
  return (
    <button
      type="button"
      onClick={() => ctx?.openSettings()}
      className="bg-transparent p-0 text-xs uppercase tracking-[0.14em] text-inherit transition hover:text-cream"
    >
      Cookie settings
    </button>
  );
}

export function ConsentBanner() {
  const ctx = useContext(ConsentContext);
  const pathname = usePathname() || '/';
  const hasBar = hasMobileActionBar(pathname);
  const banner = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ctx?.bannerOpen) return;
    const el = banner.current;
    if (!el) return;

    const apply = () => {
      const rect = el.getBoundingClientRect();
      const bannerHeight = Math.round(el.getBoundingClientRect().height);
      // Distance from the top of the banner to the bottom of the viewport.
      // That is the banner's own height plus the mobile bar and safe area it
      // sits on, so a focused control is scrolled clear of all of it.
      const obstruction = Math.max(bannerHeight, Math.round(window.innerHeight - rect.top));
      document.documentElement.style.setProperty('--consent-banner-h', `${bannerHeight}px`);
      document.documentElement.style.scrollPaddingBottom = `${obstruction}px`;
      // scroll-padding only works when the page can scroll the target into the
      // clear area. Padding the body by the same amount makes the last links
      // reachable above the banner (WCAG 2.4.11).
      document.body.style.paddingBottom = `${obstruction}px`;
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    window.addEventListener('resize', apply);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', apply);
      document.documentElement.style.scrollPaddingBottom = '';
      document.documentElement.style.removeProperty('--consent-banner-h');
      document.body.style.paddingBottom = '';
    };
  }, [ctx?.bannerOpen, hasBar]);

  useEffect(() => {
    if (!ctx?.settingsRequest) return;
    heading.current?.focus();
  }, [ctx?.settingsRequest]);

  if (!ctx?.bannerOpen) return null;

  return (
    <section
      ref={banner}
      id="cookie-settings"
      role="region"
      aria-labelledby="cookie-settings-heading"
      data-mobile-bar={hasBar ? 'true' : 'false'}
      className="cookie-banner fixed inset-x-0 z-[90] overflow-y-auto border-t border-border-subtle bg-ink/95 p-4 text-sm text-cream"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2
            ref={heading}
            id="cookie-settings-heading"
            tabIndex={-1}
            className="text-xs font-medium uppercase tracking-[0.18em] text-cream outline-none"
          >
            Cookie settings
          </h2>
          <p className="mt-2 text-cream/85">
            {ctx.noticeOnly
              ? 'We use cookies for analytics (Google, Meta, Microsoft Clarity) to understand how the site is used. Decline turns them off. '
              : 'We would like to use analytics cookies (Google, Meta, Microsoft Clarity) to understand how the site is used. They stay off unless you accept. '}
            <a href="/privacy-policy/" className="underline underline-offset-2">Privacy Policy</a>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" className={choiceButtonClass} onClick={() => ctx.choose('denied')}>Decline</button>
          <button type="button" className={choiceButtonClass} onClick={() => ctx.choose('granted')}>Accept</button>
        </div>
      </div>
    </section>
  );
}

const choiceButtonClass =
  'inline-flex min-h-11 min-w-[8.5rem] flex-1 items-center justify-center border border-cream px-5 text-xs uppercase tracking-[0.14em] text-cream sm:flex-none';

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
