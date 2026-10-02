/**
 * Central site configuration: brand facts, contact details, navigation.
 *
 * Timber and Love is presented as ONE parent brand connecting five customer
 * pathways: Design + Build, Buy or Sell, Sell for Cash, Invest, and Vacation
 * Rentals. Property management is intentionally NOT offered and must never
 * appear in navigation, copy, metadata, or structured data.
 *
 * Only verified facts belong here. Where a fact is not yet confirmed by the
 * business it is marked `TEMP:` so it can be found and approved before launch.
 */

export const site = {
  name: 'Timber and Love',
  legalName: 'Timber and Love',
  url: 'https://timberandlove.com',
  founded: 2015,
  description:
    "Timber and Love brings together design, construction, real estate, direct home offers, investment, and distinctive vacation stays. One trusted Boise team for every stage of home and real estate.",
  positioning: 'Every Stage of Home and Real Estate. One Trusted Team.',
  phone: '(208) 995-9516',
  phoneHref: 'tel:+12089959516',
  email: 'connect@timberandlove.com',
  address: {
    street: '3024 W Fairview Ave',
    city: 'Boise',
    region: 'ID',
    postalCode: '83702',
    full: '3024 W Fairview Ave, Boise, ID 83702',
  },
  geo: { lat: '43.619900', lng: '-116.227162' },
  map: 'https://share.google/Ga7dguR36OVrALLlH',
  reviewUrl: 'https://g.page/r/CRGHjvpIySGwEB0/review',
  partnerships: { phone: '(310) 990-6549', phoneHref: 'tel:+13109906549', email: 'brian@emmllc.com' },
  social: {
    instagram: 'https://www.instagram.com/timberandlove/',
    facebook: 'https://www.facebook.com/timberandlove/',
  },
  book: {
    title: 'Americana Soul',
    amazon: 'https://www.amazon.com/Americana-Soul-Designed-Comfort-Intention/dp/1982187409',
  },
  shows: {
    boiseBoys: 'https://www.discoveryplus.com/show/boise-boys',
    outgrown: 'https://www.discoveryplus.com/show/outgrown-us',
  },
  // Affiliated external destinations. Each is clearly labeled at the point of
  // use so visitors always know when they are leaving the main site.
  external: {
    realty: 'https://timberandloverealty.com/',
    invest: 'https://timberandloverealty.com/invest-with-us/',
    greenway: 'https://timberandloverealty.com/greenway/',
    cashOffers: 'https://buymyhouse.co/',
  },
} as const;

/**
 * The five customer pathways that define the entire brand. Every offering ties
 * back to homes, real estate, thoughtful design, local experience, and trusted
 * guidance. Internal gateway pages introduce each affiliated destination before
 * routing visitors away.
 */
export type Pathway = {
  key: 'design-build' | 'buy-sell' | 'sell-cash' | 'invest' | 'stay';
  label: string; // navigation / selector label
  title: string; // full pathway title
  blurb: string; // one concise sentence
  href: string; // internal gateway or page
  cta: string; // descriptive action wording
  image: string; // representative imagery
  external?: boolean; // true when href leaves the site directly
};

export const pathways: Pathway[] = [
  {
    key: 'design-build',
    label: 'Design + Build',
    title: 'Design or Remodel a Home',
    blurb: 'Custom homes, additions, whole-home renovations, and thoughtful residential transformations.',
    href: '/design-and-build/',
    cta: 'Explore Design + Build',
    image: '/editorial/cedar-fireplace.webp',
  },
  {
    key: 'buy-sell',
    label: 'Buy or Sell',
    title: 'Buy or Sell a Home',
    blurb: 'Real estate guidance through Timber and Love Realty, with local Boise market experience.',
    href: '/buy-or-sell/',
    cta: 'Buy or Sell a Home',
    image: '/projects/promise-ln-5120/5120-promise-ln-exterior-side.jpg',
  },
  {
    key: 'sell-cash',
    label: 'Sell for Cash',
    title: 'Sell a Home for Cash',
    blurb: 'Direct offers through Buy My House for homeowners exploring a sale without listing.',
    href: '/sell-for-cash/',
    cta: 'Request a Cash Offer',
    image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Home-Buying-Background-2-min.jpg',
  },
  {
    key: 'invest',
    label: 'Invest',
    title: 'Invest in Real Estate',
    blurb: 'Explore real estate investment and development opportunities with Timber and Love Realty.',
    href: '/invest/',
    cta: 'Explore Investment Opportunities',
    image: '/projects/promise-ln-5142/5142-promise-ln-exterior-rear.jpg',
  },
  {
    key: 'stay',
    label: 'Stay With Us',
    title: 'Book a Vacation Stay',
    blurb: 'Distinctive Timber and Love vacation properties in Boise, McCall, and Oahu.',
    href: '/stay-with-us/',
    cta: 'View Vacation Rentals',
    image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Stay-With-Us-Background-Image-New-Meadows-1-1.jpg',
  },
];

export type NavItem = {
  label: string;
  href?: string;
  external?: boolean;
  description?: string;
  children?: NavItem[];
};

// Secondary links surfaced in the footer and supporting navigation.
export const secondaryNav: NavItem[] = [
  { label: 'Shows + Watch', href: '/shows/' },
  { label: 'Gallery', href: '/timber-and-love-gallery/' },
  { label: 'Boise Boys', href: site.shows.boiseBoys, external: true },
  { label: 'Outgrown', href: site.shows.outgrown, external: true },
  { label: 'Americana Soul', href: '/about/#americana-soul' },
  { label: 'Press & Partnerships', href: '/contact/#press' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
];
