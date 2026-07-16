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
 */
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GT-P3NNWV8';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '898896691730737';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'lpvs1f5dzy';

export default function Analytics() {
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
