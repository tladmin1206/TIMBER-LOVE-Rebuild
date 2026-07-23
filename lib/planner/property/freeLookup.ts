import type { PropertyFacts } from '../types';
import { qualify } from './serviceArea';

/**
 * Keyless address and parcel lookup.
 *
 * Deliberately free and unauthenticated, so the planner works without any
 * account, contract, or key to rotate. Two public sources:
 *
 *  - Photon (photon.komoot.io), an OpenStreetMap geocoder built for type-ahead,
 *    used for address suggestions. Nominatim is the better-known OSM endpoint
 *    but its usage policy explicitly forbids autocomplete; Photon exists for
 *    exactly this case.
 *  - Ada County GIS, which publishes its parcel layer openly. This is the
 *    authoritative record for the core service area and needs no key.
 *
 * What the county publishes is lot size, zoning, assessed value and parcel ID.
 * It does NOT publish year built, finished area, or bedroom count: those are
 * building characteristics, and they are precisely what the paid providers
 * sell. The planner therefore asks for those two or three facts rather than
 * pretending to know them.
 *
 * Everything here degrades to null rather than throwing. A lookup that fails is
 * a slightly longer form, never a broken flow.
 */

const TIMEOUT_MS = 3500;

/** Treasure Valley centroid, used to bias suggestions toward the service area. */
const BIAS = { lat: 43.61, lng: -116.2 };

export type AddressSuggestion = {
  /** Single-line label shown in the dropdown. */
  label: string;
  houseNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
  lat: number;
  lng: number;
};

async function withTimeout<T>(fn: (signal: AbortSignal) => Promise<T>): Promise<T | null> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), TIMEOUT_MS);
  try {
    return await fn(c.signal);
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/* ------------------------------------------------------------------ *
 * Address suggestions
 * ------------------------------------------------------------------ */

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    housenumber?: string;
    street?: string;
    city?: string;
    state?: string;
    postcode?: string;
    countrycode?: string;
    name?: string;
  };
};

export async function suggestAddresses(query: string): Promise<AddressSuggestion[]> {
  if (query.trim().length < 3) return [];

  const result = await withTimeout(async (signal) => {
    const url = new URL('https://photon.komoot.io/api/');
    url.searchParams.set('q', query);
    url.searchParams.set('limit', '6');
    url.searchParams.set('lang', 'en');
    url.searchParams.set('lat', String(BIAS.lat));
    url.searchParams.set('lon', String(BIAS.lng));

    const res = await fetch(url, {
      signal,
      // Identifying the caller is the courtesy the public instance asks for.
      headers: { 'User-Agent': 'TimberAndLove-Planner/1.0 (+https://timberandlove.com)' },
    });
    if (!res.ok) return null;
    return (await res.json()) as { features?: PhotonFeature[] };
  });

  const features = result?.features ?? [];

  return features
    // Street-level results only. A city or region tells us nothing about a home.
    .filter((f) => f.properties.countrycode === 'US' && f.properties.street)
    .map((f) => {
      const p = f.properties;
      const line1 = [p.housenumber, p.street].filter(Boolean).join(' ');
      const line2 = [p.city, p.state, p.postcode].filter(Boolean).join(' ');
      return {
        label: [line1, line2].filter(Boolean).join(', '),
        houseNumber: p.housenumber,
        street: p.street,
        city: p.city,
        state: p.state,
        postcode: p.postcode,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      };
    })
    // Photon returns several nodes for one building; one row per address.
    .filter((s, i, all) => all.findIndex((o) => o.label === s.label) === i);
}

/* ------------------------------------------------------------------ *
 * Parcel enrichment: Ada County open data
 * ------------------------------------------------------------------ */

const ADA_PARCELS =
  'https://services2.arcgis.com/dgGjZc6xAH5m5JyP/arcgis/rest/services/Parcels/FeatureServer/5/query';

type ParcelAttrs = {
  PARCEL?: string;
  ADDRESS?: string;
  ACRES?: number;
  ZONING?: string;
  TOTALVALUE?: number;
  CITY_STATE?: string;
};

/**
 * Builds the address prefix the county layer stores, e.g. "1401 W IDAHO".
 * Only characters that can appear in a street address survive, so the value is
 * safe to interpolate into the layer's WHERE clause.
 */
const DIRECTIONS: Record<string, string> = {
  NORTH: 'N',
  SOUTH: 'S',
  EAST: 'E',
  WEST: 'W',
  NORTHEAST: 'NE',
  NORTHWEST: 'NW',
  SOUTHEAST: 'SE',
  SOUTHWEST: 'SW',
};

function addressPrefix(s: AddressSuggestion): string | null {
  if (!s.houseNumber || !s.street) return null;

  let street = s.street
    .toUpperCase()
    // Drop the type suffix; the county keeps it in its own column.
    .replace(
      /\b(STREET|ST|AVENUE|AVE|ROAD|RD|DRIVE|DR|LANE|LN|COURT|CT|PLACE|PL|BOULEVARD|BLVD|WAY|CIRCLE|CIR|TERRACE|TER)\b\.?$/,
      ''
    )
    .trim();

  // The geocoder spells directions out ("West Idaho Street") while the county
  // abbreviates them ("W IDAHO ST"). Without this the two never match.
  street = street
    .split(/\s+/)
    .map((word, i, all) => (i === 0 || i === all.length - 1 ? DIRECTIONS[word] ?? word : word))
    .join(' ');

  const safe = `${s.houseNumber} ${street}`.replace(/[^A-Z0-9 ]/gi, '').replace(/\s+/g, ' ').trim();
  return safe.length >= 3 ? safe : null;
}

export type ParcelFacts = Pick<
  PropertyFacts,
  'lotSizeSqFt' | 'estimatedValue' | 'zoning' | 'parcelId' | 'jurisdiction'
> & { matchedAddress?: string };

const SQ_FT_PER_ACRE = 43_560;

export async function lookupParcel(s: AddressSuggestion): Promise<ParcelFacts | null> {
  const prefix = addressPrefix(s);
  if (!prefix) return null;

  const result = await withTimeout(async (signal) => {
    const url = new URL(ADA_PARCELS);
    url.searchParams.set('where', `ADDRESS LIKE '${prefix}%'`);
    url.searchParams.set('outFields', 'PARCEL,ADDRESS,ACRES,ZONING,TOTALVALUE,CITY_STATE');
    url.searchParams.set('returnGeometry', 'false');
    url.searchParams.set('resultRecordCount', '1');
    url.searchParams.set('f', 'json');

    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    return (await res.json()) as { features?: { attributes: ParcelAttrs }[] };
  });

  const a = result?.features?.[0]?.attributes;
  if (!a) return null;

  return {
    parcelId: a.PARCEL?.trim(),
    matchedAddress: a.ADDRESS?.trim(),
    lotSizeSqFt: a.ACRES ? Math.round(a.ACRES * SQ_FT_PER_ACRE) : undefined,
    zoning: a.ZONING?.trim() || undefined,
    // Assessed total, which drives the over-improvement advisory (§ 5.4).
    estimatedValue: a.TOTALVALUE && a.TOTALVALUE > 0 ? a.TOTALVALUE : undefined,
    jurisdiction: s.city,
  };
}

/**
 * Everything the free sources can establish about a property, plus the service
 * area band. `known` reports which building facts still need asking, so the UI
 * can request exactly those and nothing more.
 */
export async function lookupProperty(s: AddressSuggestion): Promise<{
  facts: Partial<PropertyFacts>;
  source: PropertyFacts['enrichmentSource'];
  stillNeeded: ('yearBuilt' | 'finishedSqFt')[];
}> {
  const area = qualify({ lat: s.lat, lng: s.lng });
  const parcel = await lookupParcel(s);

  return {
    facts: {
      serviceAreaBand: area.band,
      jurisdiction: s.city, ...(parcel ?? {}),
    },
    // ASSESSOR when the county answered; the homeowner supplies the rest.
    source: parcel ? 'ASSESSOR' : 'NONE',
    // Never published free by any county feed: always asked, never guessed.
    stillNeeded: ['yearBuilt', 'finishedSqFt'],
  };
}
