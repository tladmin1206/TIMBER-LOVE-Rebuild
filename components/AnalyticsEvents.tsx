'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

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
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('a,button[data-track]');
      if (!target) return;

      const name = target.getAttribute('data-track') || (target.matches('a.btn-primary,a.btn-secondary') ? 'cta_click' : null);
      const isExternal = target.getAttribute('data-external') === 'true' || target.getAttribute('target') === '_blank';
      const href = target.getAttribute('href') || undefined;
      let host: string | undefined;
      try {
        if (href) host = new URL(href, window.location.origin).host;
      } catch {
        /* ignore malformed href */
      }

      // Every phone link counts as a call lead, wherever it sits on the page.
      if (href?.startsWith('tel:')) trackEvent('call_click', { event_category: 'lead', link_location: target.closest('header,footer,nav') ? 'chrome' : 'page' });
      if (name?.startsWith('book_')) trackEvent('booking_handoff', { property: name.slice(5) });
      if (name) {
        trackEvent(name, { event_category: 'cta' });
      }
      if (isExternal && host && host !== window.location.host) {
        trackEvent('outbound_click', { event_category: 'outbound', destination: host });
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
