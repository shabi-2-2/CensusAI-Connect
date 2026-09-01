import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";

describe("Security & Rate Limiting System", () => {
  const testIp = "test-client-123";

  it("extracts IP identifier safely from standard and forwarded headers", () => {
    const headers1 = new Headers({ "x-forwarded-for": "203.0.113.195, 70.41.3.18" });
    expect(getClientIdentifier(headers1)).toBe("203.0.113.195");

    const headers2 = new Headers({ "x-real-ip": "198.51.100.4" });
    expect(getClientIdentifier(headers2)).toBe("198.51.100.4");

    const emptyHeaders = new Headers();
    expect(getClientIdentifier(emptyHeaders)).toBe("anonymous-client");
  });

  it("allows requests under the maximum rate limit threshold", () => {
    const res1 = checkRateLimit("unique-client-1", { maxRequests: 5, windowMs: 10_000 });
    expect(res1.allowed).toBe(true);
    expect(res1.remaining).toBe(4);

    const res2 = checkRateLimit("unique-client-1", { maxRequests: 5, windowMs: 10_000 });
    expect(res2.allowed).toBe(true);
    expect(res2.remaining).toBe(3);
  });

  it("blocks requests that exceed the rate limit threshold", () => {
    const clientId = "flooding-bot";
    for (let i = 0; i < 3; i++) {
      checkRateLimit(clientId, { maxRequests: 3, windowMs: 10_000 });
    }

    const blocked = checkRateLimit(clientId, { maxRequests: 3, windowMs: 10_000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetMs).toBeGreaterThan(0);
  });
});
