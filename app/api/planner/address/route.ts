import { NextResponse } from 'next/server';
import { suggestAddresses, lookupProperty, type AddressSuggestion } from '@/lib/planner/property/freeLookup';

/**
 * Address suggestions and property lookup.
 *
 * Proxied through our own server rather than called from the browser, for three
 * reasons: the public geocoder asks callers to identify themselves, which a
 * browser request cannot do honestly; responses can be cached here; and the
 * upstream hosts never see a visitor's IP.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Suggestions for the same prefix repeat constantly while someone types.
const cache = new Map<string, { at: number; value: unknown }>();
const TTL_MS = 1000 * 60 * 10;

function cached<T>(key: string): T | null {
  const hit = cache.get(key);
  if (!hit || Date.now() - hit.at > TTL_MS) return null;
  return hit.value as T;
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q')?.trim() ?? '';
  if (q.length < 3) return NextResponse.json({ suggestions: [] });

  const key = `s:${q.toLowerCase()}`;
  const hit = cached<AddressSuggestion[]>(key);
  if (hit) return NextResponse.json({ suggestions: hit });

  const suggestions = await suggestAddresses(q);
  cache.set(key, { at: Date.now(), value: suggestions });
  return NextResponse.json({ suggestions });
}

/** Resolves a chosen suggestion into everything the free sources establish. */
export async function POST(req: Request) {
  let body: { suggestion?: AddressSuggestion };
  try {
    body = (await req.json()) as { suggestion?: AddressSuggestion };
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const s = body.suggestion;
  if (!s || typeof s.lat !== 'number' || typeof s.lng !== 'number') {
    return NextResponse.json({ error: 'A selected address is required.' }, { status: 400 });
  }

  const key = `p:${s.label.toLowerCase()}`;
  const hit = cached<unknown>(key);
  if (hit) return NextResponse.json(hit);

  const result = await lookupProperty(s);
  cache.set(key, { at: Date.now(), value: result });
  return NextResponse.json(result);
}
