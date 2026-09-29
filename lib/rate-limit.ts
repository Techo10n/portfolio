/**
 * Fixed-window, in-memory rate limiter.
 *
 * Best effort only: on serverless each instance keeps its own counts and they reset on cold
 * start. It stops casual abuse from a single client; a platform rule (Vercel WAF rate limit on
 * /api/contact) is the real protection once deployed.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function allow(key: string, now = Date.now()): boolean {
    // Drop expired entries so the map can't grow without bound.
    if (hits.size > 10_000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}
