'use client';

import { site } from '@/lib/site';
import { useModal } from '@/components/ui/ModalProvider';

/**
 * Recreates the WordPress "fixed-bottom-menu" plugin bar shown on mobile:
 * quick actions for each line of business.
 */
export default function MobileBottomBar() {
  const { openModal } = useModal();

  const items = [
    { label: 'Connect', onClick: () => openModal('connect') },
    { label: 'Buy / Sell', href: site.external.realty, external: true },
    { label: 'Book a Stay', href: '/stay-with-us/' },
    { label: 'Get Offer', href: site.external.cashOffers, external: true },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-cream/10 bg-ink/95 backdrop-blur xl:hidden">
      {items.map((it) =>
        it.onClick ? (
          <button
            key={it.label}
            onClick={it.onClick}
            className="py-3 text-[10px] uppercase tracking-[0.12em] text-cream/85 transition active:bg-cream/10"
          >
            {it.label}
          </button>
        ) : (
          <a
            key={it.label}
            href={it.href}
            {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="py-3 text-center text-[10px] uppercase tracking-[0.12em] text-cream/85 transition active:bg-cream/10"
          >
            {it.label}
          </a>
        )
      )}
    </nav>
  );
}
