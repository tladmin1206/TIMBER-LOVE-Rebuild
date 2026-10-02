"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationGroups } from "@/lib/navigation";
import { site } from "@/lib/site";
import { useDialogFocus } from "@/components/hooks/useDialogFocus";

const LOGO =
  "/wp-content/uploads/2024/03/Timber-And-Love-Icon-White-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png";
export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accordion, setAccordion] = useState<string | null>("design");
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileDialog = useRef<HTMLDivElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathname = usePathname();
  useDialogFocus(mobile, mobileDialog);
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 32);
    const resize = () => {
      if (window.innerWidth >= 1280) setMobile(false);
      else setOpen(null);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open) triggers.current[open]?.focus();
        setOpen(null);
        setMobile(false);
      }
    };
    const outside = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const active = navigationGroups.find((group) => group.id === open);
  const close = () => {
    setOpen(null);
    setMobile(false);
  };
  return (
    <header
      ref={header}
      className={`media-card fixed inset-x-0 top-0 z-50 ${scrolled || open || mobile ? "bg-ink shadow-lg" : "bg-gradient-to-b from-ink/95 to-ink/50"}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
      }}
    >
      <div className="container-wide flex h-[76px] items-center justify-between gap-5 lg:h-[88px]">
        <Link
          href="/"
          aria-label="Timber and Love home"
          onClick={close}
          className="shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO}
            alt="Timber and Love"
            width={300}
            height={126}
            className="h-10 w-auto"
          />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {navigationGroups.map((group) => (
            <button
              key={group.id}
              ref={(el) => {
                triggers.current[group.id] = el;
              }}
              aria-expanded={open === group.id}
              aria-controls={`mega-${group.id}`}
              onClick={() => setOpen(open === group.id ? null : group.id)}
              className="flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[.12em] text-cream hover:text-cream/70"
            >
              {group.label}
              <span
                aria-hidden="true"
                className={`transition-transform ${open === group.id ? "rotate-180" : ""}`}
              >
                ⌄
              </span>
            </button>
          ))}
          <Link
            href="/timber-and-love-gallery/"
            className="py-3 text-[11px] uppercase tracking-[.12em] text-cream"
            onClick={close}
          >
            Our Work
          </Link>
          <Link
            href="/shows/"
            className="py-3 text-[11px] uppercase tracking-[.12em] text-cream"
            onClick={close}
          >
            Watch
          </Link>
        </nav>
        <Link
          href="/contact/"
          className="btn-primary hidden !px-5 !text-[11px] xl:inline-flex"
          onClick={close}
        >
          Start a Conversation
        </Link>
        <button
          ref={toggle}
          onClick={() => setMobile(true)}
          aria-label="Open navigation"
          aria-expanded={mobile}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span className="h-px w-6 bg-white" />
          <span className="h-px w-6 bg-white" />
          <span className="h-px w-6 bg-white" />
        </button>
      </div>
      {active && (
        <div
          id={`mega-${active.id}`}
          className="section-paper absolute inset-x-0 top-full hidden border-t border-border-subtle shadow-2xl xl:block"
        >
          <div className="container-wide grid grid-cols-[1fr_1fr_.85fr] gap-12 py-10">
            {active.columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-5 !text-[11px]">{col.title}</p>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        onClick={close}
                        href={link.href}
                        className="group -mx-3 block px-3 py-3 transition-colors hover:bg-black/5"
                      >
                        <span className="flex items-center justify-between text-sm font-medium text-text-primary">
                          {link.label}
                          <span
                            aria-hidden="true"
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
                          {link.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href={active.featureHref}
              onClick={close}
              className="group border-l border-border-subtle pl-10"
            >
              {/* Keep the complete team portrait visible; architecture can fill its frame. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={
                  active.id === "story"
                    ? "The Timber and Love team outside the Boise studio"
                    : ""
                }
                className={`h-52 w-full ${active.id === "story" ? "object-contain bg-[#e3ddd3]" : "object-cover"}`}
              />
              <p className="mt-5 text-lg font-light leading-snug !text-text-primary">
                {active.feature}
              </p>
              <span className="mt-3 inline-block text-xs uppercase tracking-widest text-text-secondary">
                Explore →
              </span>
            </Link>
          </div>
        </div>
      )}
      {mobile && (
        <div
          ref={mobileDialog}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="media-card fixed inset-0 z-[60] flex flex-col bg-ink xl:hidden"
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-border-subtle px-5">
            <span className="text-xs uppercase tracking-[.2em]">
              Timber + Love
            </span>
            <button
              className="h-11 w-11 text-3xl"
              onClick={close}
              aria-label="Close navigation"
            >
              ×
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="overflow-y-auto overscroll-contain px-5 pb-10"
            style={{ paddingBottom: "max(32px, env(safe-area-inset-bottom))" }}
          >
            {navigationGroups.map((group) => (
              <div key={group.id} className="border-b border-border-subtle">
                <button
                  onClick={() =>
                    setAccordion(accordion === group.id ? null : group.id)
                  }
                  aria-expanded={accordion === group.id}
                  aria-controls={`mobile-${group.id}`}
                  className="flex min-h-16 w-full items-center justify-between text-left text-sm uppercase tracking-[.12em]"
                >
                  {group.label}
                  <span aria-hidden="true">
                    {accordion === group.id ? "−" : "+"}
                  </span>
                </button>
                {accordion === group.id && (
                  <div id={`mobile-${group.id}`} className="space-y-6 pb-6">
                    {group.columns.map((col) => (
                      <div key={col.title}>
                        <p className="mb-2 text-[10px] uppercase tracking-[.18em] text-cream/50">
                          {col.title}
                        </p>
                        {col.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={close}
                            className="block py-3 text-sm text-cream"
                          >
                            {link.label}
                            <span className="mt-1 block text-xs leading-relaxed text-text-muted">
                              {link.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/timber-and-love-gallery/"
              onClick={close}
              className="block border-b border-border-subtle py-5 text-sm uppercase tracking-widest"
            >
              Our Work
            </Link>
            <Link
              href="/shows/"
              onClick={close}
              className="block border-b border-border-subtle py-5 text-sm uppercase tracking-widest"
            >
              Shows + Watch
            </Link>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact/" onClick={close} className="btn-primary">
                Start a Conversation
              </Link>
              <a href={site.phoneHref} className="btn-secondary">
                Call {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
