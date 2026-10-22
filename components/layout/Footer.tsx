import NavLink from '@/components/ui/NavLink';
import Link from 'next/link';
import Newsletter from '@/components/forms/Newsletter';
import Stars from '@/components/ui/Stars';
import { site, pathways } from '@/lib/site';
import { googleReviews } from '@/lib/content/home';

const WORDMARK =
  '/wp-content/uploads/2024/03/Timber-And-Love-Logo-White-1-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png';

type Item = { label: string; href: string; external?: boolean };

// Services people can start with, grouped with financing since it supports them.
const services: Item[] = [
  ...pathways,
  { label: 'Financing', href: '/financing/' },
];

const company: Item[] = [
  { label: 'Our Story', href: '/about/' },
  { label: 'Our Process', href: '/our-process/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Our Work', href: '/timber-and-love-gallery/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'Contact', href: '/contact/' },
];

const mediaLinks: Item[] = [
  { label: 'Shows + Watch', href: '/shows/' },
  { label: 'Luke and Clint on YouTube', href: 'https://www.youtube.com/@lukeandclint', external: true },
  { label: 'HGTV: The Boise Boys', href: '/the-boise-boys/' },
  { label: 'Boise Boys on Discovery+', href: site.shows.boiseBoys, external: true },
  { label: 'Outgrown on Discovery+', href: site.shows.outgrown, external: true },
  { label: 'Americana Soul (Book)', href: '/about/#americana-soul' },
  { label: 'Press & Partnerships', href: '/contact/#press' },
];

function FooterLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  return (
    <NavLink
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      // inline-block + vertical padding lifts the tap target to a comfortable
      // height on touch; list gaps alone left these well under 44px.
      className="link-underline inline-flex min-h-11 items-center py-1.5"
    >
      {label}
      {external && <span aria-hidden="true" className="ml-0.5 text-[0.7em] opacity-70">↗</span>}
    </NavLink>
  );
}

export default function Footer() {
  const columns: { heading: string; items: Item[] }[] = [
    { heading: 'What We Do', items: services },
    { heading: 'Company', items: company },
    { heading: 'Shows & Media', items: mediaLinks },
  ];

  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      {/* Row 1: brand identity on the left, link columns + newsletter on the right. */}
      <div className="container-wide grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORDMARK} alt="Timber + Love" className="h-14 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-secondary">
            One trusted Boise team for every stage of home and real estate. Design, build, buy, sell, invest, and stay,
            led by Luke Caldwell of HGTV&apos;s Boise Boys.
          </p>
          <div className="mt-6 flex gap-4 text-xs uppercase tracking-[0.16em]">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Instagram</a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Facebook</a>
          </div>
          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track="footer_reviews"
            className="mt-6 inline-flex items-center gap-2 border border-border-subtle px-3 py-2 text-xs text-text-secondary transition-colors hover:border-cream/40 hover:text-cream"
          >
            <span className="uppercase tracking-[0.14em]">Read Google Reviews</span>
          </a>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="lg:col-span-2">
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">{col.heading}</h3>
            <ul className="mt-6 space-y-1 text-sm text-text-secondary">
              {col.items.map((n) => (
                /* Props are passed explicitly rather than spread: `services`
                   includes the pathway objects, which carry their own `key`
                   field, and spreading it made React read that as the element
                   key and warn on every render. */
                <li key={n.label}>
                  <FooterLink label={n.label} href={n.href} external={n.external} />
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-3">
          <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Stay in the Loop</h3>
          <p className="mt-6 text-sm leading-relaxed text-text-secondary">
            Get occasional design inspiration and Timber + Love updates in your inbox.
          </p>
          <div className="mt-5">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Row 2: contact details as a clean labeled band. */}
      <div className="border-t border-border-subtle">
        <div className="container-wide grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-text-muted">Visit</h3>
            <p className="mt-3 text-sm not-italic leading-relaxed text-text-secondary">{site.address.full}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-text-muted">Call</h3>
            <p className="mt-3 text-sm"><a href={site.phoneHref} className="link-underline text-text-secondary transition hover:text-cream">{site.phone}</a></p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-text-muted">Email</h3>
            <p className="mt-3 text-sm"><a href={`mailto:${site.email}`} className="link-underline break-words text-text-secondary transition hover:text-cream">{site.email}</a></p>
          </div>
        </div>
      </div>

      {/* Bottom bar: legal on the left, copyright + credit on the right. */}
      <div className="border-t border-border-subtle">
        <div className="container-wide flex flex-col-reverse items-center justify-between gap-3 py-5 text-xs text-text-muted sm:flex-row">
          <div className="flex gap-5">
            <Link href="/privacy-policy/" className="uppercase tracking-[0.14em] transition hover:text-cream">Privacy Policy</Link>
            <Link href="/terms-and-conditions/" className="uppercase tracking-[0.14em] transition hover:text-cream">Terms</Link>
          </div>
          <p className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} Timber + Love. All rights reserved.
            <span className="mx-2 text-border-subtle" aria-hidden="true">&middot;</span>
            Made with <span aria-hidden="true">🤍</span><span className="sr-only">love</span> by{' '}
            <a
              href="https://webiq.co"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.14em] text-text-secondary underline-offset-2 transition hover:text-cream hover:underline"
            >
              WEB IQ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
