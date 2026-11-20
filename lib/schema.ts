import { site } from './site';

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
// Dark mark on white: search engines show the logo on light backgrounds, where
// the white header logo would disappear.
const LOGO = `${site.url}/brand/timber-and-love-logo-dark.png`;
export const PERSON_ID = `${site.url}/#luke-caldwell`;

/** Cities the Boise design-build team serves (kept in one place for all schema). */
export const SERVICE_CITIES = ['Boise', 'Meridian', 'Eagle', 'Nampa', 'Caldwell', 'Kuna', 'Star', 'Garden City', 'Middleton'];
const areaServed = SERVICE_CITIES.map((name) => ({ '@type': 'City', name }));
const DEFAULT_IMAGE = `${site.url}/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: 'US',
};

/** Site-wide Organization node (referenced by other schema via @id). */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.gbpName,
  alternateName: site.name,
  url: `${site.url}/`,
  logo: LOGO,
  image: DEFAULT_IMAGE,
  description: site.description,
  foundingDate: String(site.founded),
  founder: { '@id': PERSON_ID },
  telephone: site.phone,
  email: site.email,
  address: postalAddress,
  sameAs: [site.social.instagram, site.social.facebook, site.map],
};

/** Site-wide WebSite node. */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${site.url}/`,
  name: site.name,
  publisher: { '@id': ORG_ID },
};

/**
 * Luke Caldwell, founder. Only profiles the business owns or has confirmed are
 * listed in sameAs; add more here once confirmed.
 */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Luke Caldwell',
  jobTitle: 'Founder',
  description:
    "Luke Caldwell founded Timber + Love in Boise in 2015. He co-hosted HGTV's Boise Boys with Clint Robertson, appeared on Outgrown, and wrote the design book Americana Soul.",
  image: `${site.url}/editorial/luke-firehouse.webp`,
  worksFor: { '@id': ORG_ID },
  url: `${site.url}/luke-caldwell-faq/`,
  sameAs: ['https://lukecaldwell.com/'],
  knowsAbout: ['Residential design', 'Home renovation', 'Custom homes', 'Boise real estate'],
};

/** LocalBusiness (design + build / general contractor) node. */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'GeneralContractor'],
  '@id': `${site.url}/#localbusiness`,
  name: site.gbpName,
  alternateName: site.name,
  url: `${site.url}/`,
  telephone: site.phone,
  image: DEFAULT_IMAGE,
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.map,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  areaServed,
  parentOrganization: { '@id': ORG_ID },
  sameAs: [site.social.instagram, site.social.facebook, site.map],
};

/** BreadcrumbList from an ordered list of { name, path } crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

/** Service node offered by the organization. */
export function serviceSchema(opts: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType || opts.name,
    url: `${site.url}${opts.path}`,
    areaServed,
    provider: { '@id': ORG_ID },
  };
}

/** FAQPage from question/answer pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** LodgingBusiness / vacation rental node for a property. */
export function lodgingSchema(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
  region?: string;
  locality?: string;
  amenities?: string[];
  guests?: number;
  bedrooms?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    ...(opts.image ? { image: opts.image.startsWith('http') ? opts.image : `${site.url}${opts.image}` } : {}),
    ...(opts.region
      ? {
          address: {
            '@type': 'PostalAddress',
            ...(opts.locality ? { addressLocality: opts.locality } : {}),
            addressRegion: opts.region,
            addressCountry: 'US',
          },
        }
      : {}),
    ...(opts.amenities?.length
      ? { amenityFeature: opts.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a })) }
      : {}),
    ...(opts.guests
      ? {
          containsPlace: {
            '@type': 'Accommodation',
            name: opts.name,
            occupancy: { '@type': 'QuantitativeValue', maxValue: opts.guests },
            ...(opts.bedrooms ? { numberOfBedrooms: opts.bedrooms } : {}),
          },
        }
      : {}),
    brand: { '@id': ORG_ID },
  };
}

/** Article / BlogPosting node. */
export function articleSchema(opts: {
  headline: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  byPerson?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    ...(opts.image ? { image: opts.image.startsWith('http') ? opts.image : `${site.url}${opts.image}` } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified || opts.datePublished ? { dateModified: opts.dateModified || opts.datePublished } : {}),
    author: { '@id': opts.byPerson ? PERSON_ID : ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: `${site.url}${opts.path}`,
  };
}

/** TVSeries node for a show Luke appeared in. */
export function tvSeriesSchema(opts: { name: string; url: string; network?: string; actors: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: opts.name,
    sameAs: opts.url,
    ...(opts.network ? { productionCompany: { '@type': 'Organization', name: opts.network } } : {}),
    actor: opts.actors.map((name) => (name === 'Luke Caldwell' ? { '@id': PERSON_ID } : { '@type': 'Person', name })),
  };
}
