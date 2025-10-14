
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}
interface RateLimitInfo {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private readonly requests = new Map<string, RateLimitInfo>();
  private readonly config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, info] of this.requests.entries()) {
      if (now > info.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  public checkLimit(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  } {
    this.cleanup();
    
    const now = Date.now();
    const existing = this.requests.get(identifier);

    if (!existing || now > existing.resetTime) {
      const resetTime = now + this.config.windowMs;
      this.requests.set(identifier, {
        count: 1,
        resetTime,
      });

      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime,
      };
    }

    if (existing.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: existing.resetTime,
        retryAfter: Math.ceil((existing.resetTime - now) / 1000),
      };
    }

    existing.count++;
    this.requests.set(identifier, existing);

    return {
      allowed: true,
      remaining: this.config.maxRequests - existing.count,
      resetTime: existing.resetTime,
    };
  }

  public reset(identifier?: string) {
    if (identifier) {
      this.requests.delete(identifier);
    } else {
      this.requests.clear();
    }
  }
}

export const rateLimiters = {
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, 
    maxRequests: 5, 
  }),

  api: new RateLimiter({
    windowMs: 60 * 1000, 
    maxRequests: 100,
  }),

  contact: new RateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 3,
  }),

  upload: new RateLimiter({
    windowMs: 60 * 1000, 
    maxRequests: 10, 
  }),
};

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return request.headers.get('x-client-ip') || 'unknown';
}

export { RateLimiter };