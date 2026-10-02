'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';
import { rentals } from '@/lib/content/rentals';

type Action = { label: string; href: string; external?: boolean; primary?: boolean };

/**
 * Persistent mobile action bar. The primary action is context-specific to the
 * current pathway rather than a single generic CTA repeated everywhere. Kept
 * below the mobile menu (lower z-index) so fixed elements never stack.
 */
function actionsFor(pathname: string): Action[] {
  const call: Action = { label: 'Call', href: site.phoneHref };

  if (['/design-and-build', '/our-process', '/financing', '/service-areas', '/timber-and-love-gallery', '/projects/', '/reviews'].some((route) => pathname.startsWith(route))) {
    return [call, { label: 'View Work', href: '/timber-and-love-gallery/' }, { label: 'Start Project', href: '/design-and-build-questionnaire/', primary: true }];
  }
  const rental = rentals.find((item) => item.href.replace(/\/$/, '') === pathname.replace(/\/$/, ''));
  if (rental) {
    return [{ label: 'All Stays', href: '/stay-with-us/#properties' }, { label: 'Check Availability', href: rental.bookingUrl, external: true, primary: true }];
  }
  if (pathname.startsWith('/stay-with-us') || pathname.startsWith('/vacation-rentals')) {
    return [{ label: 'Idaho Stays', href: '#idaho-properties' }, { label: 'Hawaii Stays', href: '#hawaii-properties' }, { label: 'All Properties', href: '#properties', primary: true }];
  }
  if (pathname.startsWith('/shows')) {
    return [{ label: 'Luke and Clint', href: '#episodes', primary: true }, { label: 'Boise Boys', href: '#boise-boys-episodes' }, { label: 'Outgrown', href: '#outgrown-episodes' }];
  }
  if (pathname.startsWith('/the-boise-boys')) {
    return [{ label: 'All Episodes', href: '/shows/' }, { label: 'Watch Luke and Clint', href: '/shows/#episodes', primary: true }];
  }
  if (pathname.startsWith('/sell-for-cash')) {
    return [call, { label: 'Contact', href: '/contact/' }, { label: 'Request Offer', href: site.external.cashOffers, external: true, primary: true }];
  }
  if (pathname.startsWith('/buy-or-sell')) {
    return [call, { label: 'Contact', href: '/contact/' }, { label: 'Buy or Sell', href: site.external.realty, external: true, primary: true }];
  }
  if ((pathname === '/invest' || pathname === '/invest/')) {
    return [call, { label: 'Contact', href: '/contact/' }, { label: 'Invest', href: site.external.invest, external: true, primary: true }];
  }
  // Default: help visitors self-select.
  return [call, { label: 'Our Work', href: '/timber-and-love-gallery/' }, { label: 'Get in Touch', href: '/contact/#general', primary: true }];
}

export default function MobileBottomBar() {
  const pathname = usePathname() || '/';
  const items = actionsFor(pathname);
  if (pathname.startsWith('/investment-planner') || pathname.startsWith('/admin') || pathname.startsWith('/design-and-build-questionnaire') || pathname.startsWith('/privacy-policy') || pathname.startsWith('/terms-and-conditions')) return null;

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 grid border-t border-border-subtle bg-ink/95 backdrop-blur xl:hidden"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`, paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map((it) => {
        const cls = `flex min-h-[48px] items-center justify-center px-1 py-3 text-center text-[11px] uppercase tracking-[0.1em] transition active:bg-cream/10 ${
          it.primary ? 'bg-cream font-medium text-ink' : 'text-cream/85'
        }`;
        return it.href.startsWith('#') ? (
          <a key={it.label} href={it.href} className={cls}>{it.label}</a>
        ) : it.external ? (
          <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer" className={cls}>
            {it.label}
          </a>
        ) : (
          <Link key={it.label} href={it.href} className={cls}>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
