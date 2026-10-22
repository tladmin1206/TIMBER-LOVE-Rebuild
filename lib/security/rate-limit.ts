import { dbEnabled, prisma } from '@/lib/db';

/**
 * Per-IP fixed-window-by-timestamp limiter for /api/contact.
 *
 * Backed by Postgres (RateLimitHit table) when DATABASE_URL is set, so the
 * limit holds across instances and restarts. Any database error (including
 * the table not having been pushed yet) falls back to an in-memory window
 * for this process, so the limiter never takes the form down.
 */
export const CONTACT_LIMIT = 5;
export const CONTACT_WINDOW_MS = 10 * 60 * 1000;

const memory = new Map<string, number[]>();

export type RateLimitResult = { allowed: boolean; retryAfterSec: number; backend: 'db' | 'memory' };

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim().slice(0, 64) || 'unknown';
  return (req.headers.get('x-real-ip') || 'unknown').slice(0, 64);
}

function memoryCheck(key: string, now: number, limit: number, windowMs: number): RateLimitResult {
  const hits = (memory.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    memory.set(key, hits);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)), backend: 'memory' };
  }
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 10000) {
    for (const [k, v] of memory) if (!v.some((t) => now - t < windowMs)) memory.delete(k);
  }
  return { allowed: true, retryAfterSec: 0, backend: 'memory' };
}

export async function checkRateLimit(
  ip: string,
  { scope = 'contact', limit = CONTACT_LIMIT, windowMs = CONTACT_WINDOW_MS, now = Date.now() } = {}
): Promise<RateLimitResult> {
  const key = `${scope}:${ip}`;
  if (dbEnabled) {
    try {
      const since = new Date(now - windowMs);
      const hits = await prisma.rateLimitHit.findMany({
        where: { key, createdAt: { gt: since } },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
        take: limit,
      });
      if (hits.length >= limit) {
        return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((hits[0].createdAt.getTime() + windowMs - now) / 1000)), backend: 'db' };
      }
      await prisma.rateLimitHit.create({ data: { key, createdAt: new Date(now) } });
      // Opportunistic cleanup; failure here is harmless.
      if (Math.random() < 0.02) await prisma.rateLimitHit.deleteMany({ where: { createdAt: { lt: new Date(now - 24 * 3600 * 1000) } } }).catch(() => {});
      return { allowed: true, retryAfterSec: 0, backend: 'db' };
    } catch (e) {
      console.warn('[RATE_LIMIT_DB_FALLBACK]', e instanceof Error ? e.message.slice(0, 200) : 'db error');
    }
  }
  return memoryCheck(key, now, limit, windowMs);
}

/** Test hook. */
export function _resetRateLimitMemory() { memory.clear(); }
