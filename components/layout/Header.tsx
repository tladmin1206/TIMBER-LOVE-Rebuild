'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav, site, type NavItem } from '@/lib/site';

const LOGO =
  '/wp-content/uploads/2024/03/Timber-And-Love-Icon-White-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png';

function ExternalBadge() {
  return (
    <>
      <span aria-hidden="true" className="ml-1 text-[0.7em] opacity-70">↗</span>
      <span className="sr-only"> (opens affiliated site)</span>
    </>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null); // desktop mega-menu
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Escape closes menus; outside-click closes the desktop mega-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen || openGroup
          ? 'bg-ink/95 shadow-lg shadow-black/30 backdrop-blur'
          : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className={`container-wide flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-3.5 lg:py-5'}`}>
        <Link href="/" aria-label="Timber and Love — home" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Timber and Love" className={`w-auto transition-all ${scrolled ? 'h-8' : 'h-9 lg:h-10'}`} width={300} height={126} />
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-8 text-xs uppercase tracking-[0.15em] text-cream xl:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup((g) => (g === item.label ? null : g))}
              >
                <button
                  className="flex items-center gap-1.5 py-2 uppercase tracking-[0.15em] text-cream/90 transition hover:text-cream"
                  aria-expanded={openGroup === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                >
                  {item.label}
                  <span aria-hidden="true" className={`text-[8px] transition-transform ${openGroup === item.label ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openGroup === item.label && (
                  <div className="absolute left-1/2 top-full z-10 w-[22rem] -translate-x-1/2 pt-4">
                    <div className="border border-border-subtle bg-ink/95 p-2 shadow-xl backdrop-blur">
                      {item.children.map((c) => (
                        <MegaLink key={c.label} item={c} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href || '#'}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="link-underline py-2 text-cream/90 hover:text-cream"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right primary CTA */}
        <div className="hidden items-center xl:flex">
          <Link href="/contact/" className="btn-primary !px-6 !py-2.5 text-xs">
            How Can We Help?
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span className={`h-0.5 w-6 bg-cream transition ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-cream transition ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-cream transition ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[60px] z-40 h-[calc(100dvh-60px)] overflow-y-auto border-t border-border-subtle bg-ink xl:hidden"
        >
          <nav aria-label="Mobile" className="container-wide flex min-h-full flex-col py-4 text-sm uppercase tracking-[0.12em] text-cream">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border-subtle py-1">
                  <button
                    onClick={() => setOpenMobileGroup((g) => (g === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between py-4 text-cream/90"
                    aria-expanded={openMobileGroup === item.label}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-base">{openMobileGroup === item.label ? '–' : '+'}</span>
                  </button>
                  {openMobileGroup === item.label && (
                    <div className="flex flex-col pb-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href || '#'}
                          onClick={() => setMobileOpen(false)}
                          {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="py-3 pl-3 text-cream/70"
                        >
                          {c.label}
                          {c.external && <ExternalBadge />}
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
                  className="border-b border-border-subtle py-4 text-cream/90"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-auto flex flex-col gap-3 py-6">
              <Link href="/contact/" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                How Can We Help?
              </Link>
              <a href={site.phoneHref} className="btn-secondary w-full">Call {site.phone}</a>
              <a href={`mailto:${site.email}`} className="text-center text-xs normal-case tracking-normal text-cream/60">{site.email}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MegaLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href || '#'}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="block rounded-sm px-4 py-3 transition hover:bg-cream/5"
    >
      <span className="flex items-center text-[0.8rem] tracking-[0.12em] text-cream">
        {item.label}
        {item.external && <ExternalBadge />}
      </span>
      {item.description && (
        <span className="mt-1 block whitespace-normal text-[0.7rem] normal-case leading-snug tracking-normal text-text-muted">
          {item.description}
        </span>
      )}
    </Link>
  );
}
