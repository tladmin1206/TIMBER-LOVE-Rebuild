'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { mainNav, site, type NavItem } from '@/lib/site';
import { useModal } from '@/components/ui/ModalProvider';

const LOGO =
  '/wp-content/uploads/2024/03/Timber-And-Love-Icon-White-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png';

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const props = item.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <Link href={item.href || '#'} onClick={onNavigate} className="link-underline" {...props}>
      {item.label}
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? 'bg-ink/95 shadow-lg shadow-black/30 backdrop-blur' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-6 py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" aria-label="Timber and Love — home" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Timber and Love" className="h-9 w-auto lg:h-10" width={300} height={126} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.15em] text-cream xl:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 uppercase tracking-[0.15em] text-cream/90 transition hover:text-cream">
                  {item.label}
                  <span className="text-[8px]">▼</span>
                </button>
                <div className="invisible absolute left-1/2 top-full z-10 w-60 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="border border-cream/10 bg-ink/95 py-2 shadow-xl backdrop-blur">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href || '#'}
                        {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="block px-5 py-2.5 text-cream/80 transition hover:bg-cream/5 hover:text-cream"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.label} item={item} />
            )
          )}
        </nav>

        {/* Right CTA — single Connect button (matches the live header) */}
        <div className="hidden items-center xl:flex">
          <button onClick={() => openModal('connect')} className="btn-outline !px-6 !py-2.5 text-xs">
            Connect
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="hamburger-icon"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span className={`h-0.5 w-6 bg-cream transition ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-cream transition ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-cream transition ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-cream/10 bg-ink/98 xl:hidden">
          <nav className="container-wide flex flex-col py-4 text-sm uppercase tracking-[0.12em] text-cream">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-cream/10 py-1">
                  <button
                    onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between py-3 text-cream/90"
                  >
                    {item.label}
                    <span className="text-[10px]">{openGroup === item.label ? '–' : '+'}</span>
                  </button>
                  {openGroup === item.label && (
                    <div className="flex flex-col pb-2 pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href || '#'}
                          onClick={() => setMobileOpen(false)}
                          {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="py-2.5 text-cream/70"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-cream/10 py-3.5 text-cream/90"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-3 py-5">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openModal('connect');
                }}
                className="btn-solid w-full"
              >
                Connect With Us
              </button>
              <a href={site.phoneHref} className="btn-outline w-full">
                Call {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
