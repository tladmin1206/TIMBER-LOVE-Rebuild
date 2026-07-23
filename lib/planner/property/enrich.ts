import type { PropertyFacts } from '../types';
import { qualify } from './serviceArea';

/**
 * Property data enrichment. Spec Part II §§ 4.3 to 4.5.
 *
 * This is the feature that makes the planner feel like it already knows the
 * homeowner, and the single largest reduction in questions asked. It is also
 * the feature most likely to be slow or unavailable, so the contract here is
 * blunt: enrichment never blocks, never errors into the user's face, and a
 * 2.5-second timeout is treated as a normal outcome rather than a fault.
 */

export const ENRICHMENT_TIMEOUT_MS = 2500;

export type EnrichmentInput = {
  formattedAddress: string;
  lat: number;
  lng: number;
};

export type EnrichmentResult = {
  facts: Partial<PropertyFacts>;
  source: PropertyFacts['enrichmentSource'];
  /** Present when enrichment did not produce data, for the internal log only. */
  note?: string;
};

/**
 * A provider adapter. Implementations wrap ATTOM, Estated, or a county
 * assessor feed. The interface is deliberately narrow so a provider can be
 * swapped, or a second added as a cross-check, without touching callers.
 */
export interface PropertyProvider {
  readonly name: PropertyFacts['enrichmentSource'];
  lookup(input: EnrichmentInput, signal: AbortSignal): Promise<Partial<PropertyFacts> | null>;
}

/**
 * ATTOM adapter. Inert until ATTOM_API_KEY exists, which is a procurement step
 * rather than a code one: `isConfigured` lets the caller skip it cleanly
 * instead of discovering the gap through a failed request.
 */
export class AttomProvider implements PropertyProvider {
  readonly name = 'ATTOM' as const;

  static isConfigured(): boolean {
    return !!process.env.ATTOM_API_KEY;
  }

  async lookup(input: EnrichmentInput, signal: AbortSignal): Promise<Partial<PropertyFacts> | null> {
    const key = process.env.ATTOM_API_KEY;
    if (!key) return null;

    const url = new URL('https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail');
    url.searchParams.set('address1', input.formattedAddress);

    const res = await fetch(url, {
      headers: { apikey: key, accept: 'application/json' },
      signal,
    });
    if (!res.ok) return null;

    const json = (await res.json()) as AttomResponse;
    const p = json?.property?.[0];
    if (!p) return null;

    return {
      yearBuilt: p.summary?.yearbuilt,
      finishedSqFt: p.building?.size?.livingsize,
      bedrooms: p.building?.rooms?.beds,
      bathrooms: p.building?.rooms?.bathstotal,
      lotSizeSqFt: p.lot?.lotsize2,
      stories: p.building?.summary?.levels,
      estimatedValue: p.assessment?.market?.mktttlvalue,
      zoning: p.lot?.zoningType,
    };
  }
}

type AttomResponse = {
  property?: Array<{
    summary?: { yearbuilt?: number };
    building?: {
      size?: { livingsize?: number };
      rooms?: { beds?: number; bathstotal?: number };
      summary?: { levels?: number };
    };
    lot?: { lotsize2?: number; zoningType?: string };
    assessment?: { market?: { mktttlvalue?: number } };
  }>;
};

/**
 * In-process cache keyed by address. The spec caches by `place_id` for 90 days
 * to control per-session cost; this is the same idea at the scale a single
 * server instance can hold, and it is where a shared cache would slot in.
 */
const cache = new Map<string, { at: number; value: EnrichmentResult }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 90;

/**
 * Enriches a property, degrading rather than failing.
 *
 * Every path returns a usable result. A timeout, a missing key, a provider
 * outage, and an address with no record all produce `source: 'NONE'`, which
 * the confidence score already penalises and the assumptions block already
 * discloses. The homeowner sees the three-field fallback, not an error.
 */
export async function enrichProperty(
  input: EnrichmentInput,
  providers: PropertyProvider[] = defaultProviders()
): Promise<EnrichmentResult> {
  const key = input.formattedAddress.trim().toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.value;

  const area = qualify({ lat: input.lat, lng: input.lng });
  const base: Partial<PropertyFacts> = {
    serviceAreaBand: area.band,
  };

  for (const provider of providers) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ENRICHMENT_TIMEOUT_MS);
    try {
      const facts = await provider.lookup(input, controller.signal);
      if (facts) {
        const value: EnrichmentResult = { facts: { ...base, ...facts }, source: provider.name };
        cache.set(key, { at: Date.now(), value });
        return value;
      }
    } catch {
      // Timeout, network failure, or a malformed response. Try the next
      // provider; never surface this to the homeowner.
    } finally {
      clearTimeout(timer);
    }
  }

  const value: EnrichmentResult = {
    facts: base,
    source: 'NONE',
    note: providers.length ? 'No provider returned a record for this address.' : 'No provider configured.',
  };
  cache.set(key, { at: Date.now(), value });
  return value;
}

function defaultProviders(): PropertyProvider[] {
  return AttomProvider.isConfigured() ? [new AttomProvider()] : [];
}

/** Test seam. */
export function __clearEnrichmentCache() {
  cache.clear();
}
