import Link from 'next/link';

export type Promo = {
  key: string;
  logo: string;
  logoAlt: string;
  bg: string;
  cta: string;
  href: string;
  external?: boolean;
};

/** Full-bleed service promo block: edge-to-edge image + brand logo + outlined CTA (mirrors the live homepage). */
export default function FullBleedPromo({ logo, logoAlt, bg, cta, href, external }: Promo) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <section className="relative flex min-h-[58vh] items-center overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="container-wide relative z-10">
        <div className="flex flex-wrap items-center gap-8 sm:gap-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={logoAlt} className="h-20 w-auto max-w-[210px] object-contain sm:h-24" />
          <Link href={href} className="btn-outline" {...ext}>
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
