/**
 * In-memory rate limiter for API endpoints.
 * Tracks attempts per key (IP, email, etc.) with a sliding window.
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now - entry.firstAttempt > 30 * 60 * 1000) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  /** Maximum attempts within the window */
  maxAttempts: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = { maxAttempts: 5, windowMs: 15 * 60 * 1000 }
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, firstAttempt: now, lastAttempt: now });
    return { allowed: true, remaining: config.maxAttempts - 1, retryAfterMs: 0 };
  }

  // Reset if window has expired
  if (now - entry.firstAttempt > config.windowMs) {
    store.set(key, { count: 1, firstAttempt: now, lastAttempt: now });
    return { allowed: true, remaining: config.maxAttempts - 1, retryAfterMs: 0 };
  }

  // Increment counter
  entry.count++;
  entry.lastAttempt = now;

  if (entry.count > config.maxAttempts) {
    const retryAfterMs = config.windowMs - (now - entry.firstAttempt);
    return { allowed: false, remaining: 0, retryAfterMs };
  }

  return { allowed: true, remaining: config.maxAttempts - entry.count, retryAfterMs: 0 };
}

export function resetRateLimit(key: string): void {
  store.delete(key);
}
