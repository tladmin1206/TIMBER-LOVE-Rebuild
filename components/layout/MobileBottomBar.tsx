'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

type Action = { label: string; href: string; external?: boolean; primary?: boolean };

/**
 * Persistent mobile action bar. The primary action is context-specific to the
 * current pathway rather than a single generic CTA repeated everywhere. Kept
 * below the mobile menu (lower z-index) so fixed elements never stack.
 */
function actionsFor(pathname: string): Action[] {
  const call: Action = { label: 'Call', href: site.phoneHref };

  if (pathname.startsWith('/design-and-build')) {
    return [call, { label: 'View Work', href: '/timber-and-love-gallery/' }, { label: 'Start Project', href: '/design-and-build-questionnaire/', primary: true }];
  }
  if (pathname.startsWith('/stay-with-us') || isRental(pathname)) {
    return [call, { label: 'Contact', href: '/contact/' }, { label: 'Book a Stay', href: '/stay-with-us/', primary: true }];
  }
  if (pathname.startsWith('/sell-for-cash')) {
    return [call, { label: 'Contact', href: '/contact/' }, { label: 'Request Offer', href: site.external.cashOffers, external: true, primary: true }];
  }
  if (pathname.startsWith('/buy-or-sell')) {
    return [call, { label: 'Contact', href: '/contact/' }, { label: 'Buy or Sell', href: site.external.realty, external: true, primary: true }];
  }
  if (pathname.startsWith('/invest')) {
    return [call, { label: 'Contact', href: '/contact/' }, { label: 'Invest', href: site.external.invest, external: true, primary: true }];
  }
  // Default: help visitors self-select.
  return [call, { label: 'Get an Estimate', href: '/estimate/' }, { label: 'How Can We Help?', href: '/contact/', primary: true }];
}

function isRental(p: string) {
  return ['/the-firehouse', '/the-darla-house', '/timber-and-love-chalet', '/chinamans-ocean-front-beach-house'].some((r) => p.startsWith(r));
}

export default function MobileBottomBar() {
  const pathname = usePathname() || '/';
  const items = actionsFor(pathname);

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 grid border-t border-border-subtle bg-ink/95 backdrop-blur xl:hidden"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`, paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map((it) => {
        const cls = `flex min-h-[48px] items-center justify-center px-1 py-3 text-center text-[10px] uppercase tracking-[0.12em] transition active:bg-cream/10 ${
          it.primary ? 'bg-cream font-medium text-ink' : 'text-cream/85'
        }`;
        return it.external ? (
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
