import Link from 'next/link';
import Newsletter from '@/components/forms/Newsletter';
import { site, pathways } from '@/lib/site';

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
  { label: 'HGTV: The Boise Boys', href: '/the-boise-boys/' },
  { label: 'Boise Boys on Discovery+', href: site.shows.boiseBoys, external: true },
  { label: 'Outgrown on Discovery+', href: site.shows.outgrown, external: true },
  { label: 'Americana Soul (Book)', href: '/about/#americana-soul' },
  { label: 'Press & Partnerships', href: '/contact/#press' },
];

function FooterLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      // inline-block + vertical padding lifts the tap target to a comfortable
      // height on touch; list gaps alone left these well under 44px.
      className="link-underline inline-block py-1.5"
    >
      {label}
      {external && <span aria-hidden="true" className="ml-0.5 text-[0.7em] opacity-70">↗</span>}
    </Link>
  );
}

export default function Footer() {
  const columns: { heading: string; items: Item[] }[] = [
    { heading: 'What We Do', items: services },
    { heading: 'Company', items: company },
    { heading: 'HGTV & Media', items: mediaLinks },
  ];

  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      {/* Top band: brand identity on the left, newsletter on the right. */}
      <div className="container-wide grid gap-10 border-b border-border-subtle py-16 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORDMARK} alt="Timber and Love" className="h-14 w-auto" loading="lazy" />
          <p className="mt-6 text-sm leading-relaxed text-text-secondary">
            One trusted Boise team for every stage of home and real estate. Design, build, buy, sell, invest, and stay,
            led by Luke Caldwell of HGTV&apos;s Boise Boys.
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Instagram</a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Facebook</a>
          </div>
        </div>
        <div className="lg:justify-self-end lg:max-w-md">
          <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Stay in the Loop</h3>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            Get occasional design inspiration and Timber and Love updates in your inbox.
          </p>
          <div className="mt-5">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Balanced link columns. */}
      <div className="container-wide grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">{col.heading}</h3>
            <ul className="mt-6 space-y-3 text-sm text-text-secondary">
              {col.items.map((n) => (
                <li key={n.label}><FooterLink {...n} /></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Contact</h3>
          <ul className="mt-6 space-y-3 text-sm text-text-secondary">
            <li><a href={site.phoneHref} className="link-underline">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></li>
            <li className="not-italic leading-relaxed">{site.address.full}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-5 text-xs text-text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Timber and Love. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy/" className="transition hover:text-cream">Privacy Policy</Link>
            <Link href="/terms-and-conditions/" className="transition hover:text-cream">Terms &amp; Conditions</Link>
          </div>
        </div>
        <div className="container-wide pb-6 text-center text-xs text-text-muted">
          Made with <span aria-hidden="true">🤍</span><span className="sr-only">love</span> by{' '}
          <a
            href="https://webiq.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary underline-offset-2 transition hover:text-cream hover:underline"
          >
            WEB IQ
          </a>
        </div>
      </div>
    </footer>
  );
}
