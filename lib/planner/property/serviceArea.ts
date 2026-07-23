import type { ServiceAreaBand } from '../types';
import { site } from '@/lib/site';

/**
 * Service area qualification. Spec Part II § 4.2.
 *
 * Three bands, all configurable. The important rule is the last one: do not
 * hard-stop an out-of-area homeowner. They have spent four minutes on this,
 * they are a referral and content asset, and a wall at the end is a brand
 * liability. They finish the flow, they get their report, and the consultation
 * CTA is replaced with something honest.
 */

export const SERVICE_AREA = {
  coreMiles: 25,
  extendedMiles: 50,
  // site.geo stores coordinates as strings for JSON-LD, where schema.org
  // expects them that way. Coerce once here rather than at every call site.
  origin: { lat: Number(site.geo.lat), lng: Number(site.geo.lng) },
} as const;

/** Straight-line distance in miles. Driving distance is a Phase 2 refinement. */
export function distanceMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function bandFor(miles: number): ServiceAreaBand {
  if (miles <= SERVICE_AREA.coreMiles) return 'core';
  if (miles <= SERVICE_AREA.extendedMiles) return 'extended';
  return 'outside';
}

export function qualify(coords: { lat: number; lng: number }) {
  const miles = distanceMiles(SERVICE_AREA.origin, coords);
  return { miles: Math.round(miles * 10) / 10, band: bandFor(miles) };
}

/** What an out-of-area homeowner is told, instead of a consultation CTA. */
export const OUT_OF_AREA_MESSAGE =
  'Your property sits outside the area we build in, so we would not be the right team for the construction itself. Your report is still yours to keep, and we are happy to point you toward firms who work in your area.';
