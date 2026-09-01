/**
 * lib/rateLimit.ts
 *
 * Lightweight, in-memory sliding window rate limiter for Next.js API routes.
 * Protects AI and data endpoints against excessive requests, bots, and rapid double-clicking.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipRequestMap.entries()) {
      const validTimestamps = record.timestamps.filter((ts) => now - ts < 60_000);
      if (validTimestamps.length === 0) {
        ipRequestMap.delete(ip);
      } else {
        record.timestamps = validTimestamps;
      }
    }
  }, 300_000);
}

export interface RateLimitOptions {
  /** Maximum allowed requests within the window. Default is 30. */
  maxRequests?: number;
  /** Window duration in milliseconds. Default is 60,000 (1 minute). */
  windowMs?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

/**
 * Checks if an incoming request identifier exceeds the rate limit.
 *
 * @param identifier Client IP address or session identifier
 * @param options Configurable limit and window
 * @returns RateLimitResult
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const maxRequests = options.maxRequests ?? 30;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();

  const record = ipRequestMap.get(identifier) ?? { timestamps: [] };

  // Filter timestamps within the active sliding window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= maxRequests) {
    const oldestTimestamp = activeTimestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldestTimestamp));

    return {
      allowed: false,
      remaining: 0,
      resetMs,
    };
  }

  // Record this request
  activeTimestamps.push(now);
  ipRequestMap.set(identifier, { timestamps: activeTimestamps });

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - activeTimestamps.length),
    resetMs: windowMs,
  };
}

/**
 * Extracts a client identifier (IP address) from NextRequest headers safely.
 */
export function getClientIdentifier(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "anonymous-client";
}
