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
  name: 'Timber + Love',
  legalName: 'Timber and Love',
  // Exact name on the Google Business Profile. Used wherever name, address and
  // phone appear together (footer, contact page, structured data) so NAP
  // matches the profile character for character. `name` stays the brand mark.
  gbpName: 'Timber and Love',
  // Business hours exactly as listed on the Google Business Profile.
  hours: {
    label: 'Monday to Friday, 9 AM to 5 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  url: 'https://timberandlove.com',
  founded: 2015,
  description:
    "Timber + Love brings together design and construction, real estate, cash offers, investing and vacation homes. One Boise team, led by Luke Caldwell of HGTV's Boise Boys.",
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
  // Google Business Profile (share link supplied by the business, 2026-11-20).
  map: 'https://share.google/UiImcfW5E9rAkhdpx',
  reviewUrl: 'https://g.page/r/CRGHjvpIySGwEB0/review',
  // Partnerships contact, kept as a RECORD ONLY, deliberately not a field:
  //   phone  (310) 990-6549   tel:+13109906549
  //   email  brian@emmllc.com
  //
  // c3128e1 removed both this data and the UI that displayed it, routing press
  // and partnership enquiries through the contact form instead. The UI change
  // stands. The details are preserved here because this file was their only
  // record and the removal called them "leftover" without establishing whether
  // the line is still active.
  //
  // It is a comment rather than a property on purpose. `site` is imported by
  // client components, so every field on it is serialised into the public JS
  // bundle: as a field these details were readable in page source by anyone,
  // which is the exposure the removal got rid of, just without showing them on
  // the page. A comment is stripped at build time and ships nowhere.
  //
  // So do not promote this back to a field, and do not render it, without
  // asking. Putting a phone number and email back in front of the public is a
  // business decision, not a cleanup.
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
    realtyBuy: 'https://timberandloverealty.com/buy/',
    realtySell: 'https://timberandloverealty.com/sell/',
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
    blurb: 'Custom homes, additions and whole-home renovations.',
    href: '/design-and-build/',
    cta: 'See Design + Build',
    image: '/editorial/cedar-fireplace.webp',
  },
  {
    key: 'buy-sell',
    label: 'Buy or Sell',
    title: 'Buy or Sell a Home',
    blurb: 'Timber + Love Realty. Local Boise market experience.',
    href: '/buy-or-sell/',
    cta: 'Buy or Sell a Home',
    image: '/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg',
  },
  {
    key: 'sell-cash',
    label: 'Sell for Cash',
    title: 'Sell a Home for Cash',
    blurb: 'A straight cash offer for sellers who need speed more than the last dollar.',
    href: '/sell-for-cash/',
    cta: 'Request a Cash Offer',
    image: '/projects/north-end-gem/exterior.webp',
  },
  {
    key: 'invest',
    label: 'Invest',
    title: 'Invest in Real Estate',
    blurb: 'Boise real estate investment information from Timber + Love Realty.',
    href: '/invest/',
    cta: 'See Investment Opportunities',
    image: '/projects/promise-ln-5142/5142-promise-ln-exterior-angle.jpg',
  },
  {
    key: 'stay',
    label: 'Stay With Us',
    title: 'Book a Vacation Stay',
    blurb: 'Our vacation homes in Boise, McCall and Oahu.',
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
