'use client';

import { useEffect } from 'react';

/**
 * Privacy-safe click instrumentation. A single delegated listener fires a gtag
 * event for any element carrying `data-track`, and an `outbound_click` event for
 * affiliated external destinations (`data-external`). Only non-sensitive,
 * category-style values are sent: never form field values or personal data.
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-track],[data-external]');
      if (!target) return;

      const name = target.getAttribute('data-track');
      const isExternal = target.getAttribute('data-external') === 'true' || target.getAttribute('target') === '_blank';
      const href = target.getAttribute('href') || undefined;
      let host: string | undefined;
      try {
        if (href) host = new URL(href, window.location.origin).host;
      } catch {
        /* ignore malformed href */
      }

      if (typeof window.gtag !== 'function') return;
      if (name) {
        window.gtag('event', name, { event_category: 'cta', page_path: window.location.pathname });
      }
      if (isExternal && host && host !== window.location.host) {
        window.gtag('event', 'outbound_click', { event_category: 'outbound', destination: host, page_path: window.location.pathname });
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
