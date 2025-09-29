
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
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

  // Clean up expired entries to prevent memory leaks
  private cleanup() {
    const now = Date.now();
    for (const [key, info] of this.requests.entries()) {
      if (now > info.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  // Check if request should be rate limited
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
      // First request or window expired
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

    // Within existing window
    if (existing.count >= this.config.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: existing.resetTime,
        retryAfter: Math.ceil((existing.resetTime - now) / 1000),
      };
    }

    // Increment counter
    existing.count++;
    this.requests.set(identifier, existing);

    return {
      allowed: true,
      remaining: this.config.maxRequests - existing.count,
      resetTime: existing.resetTime,
    };
  }

  // Reset rate limit for specific identifier (for testing)
  public reset(identifier?: string) {
    if (identifier) {
      this.requests.delete(identifier);
    } else {
      this.requests.clear();
    }
  }
}

// Predefined rate limiters for different use cases
export const rateLimiters = {
  // Strict limit for auth endpoints
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, 
    maxRequests: 5, 
  }),

  // General API endpoints
  api: new RateLimiter({
    windowMs: 60 * 1000, 
    maxRequests: 100,
  }),

  // Contact/form submissions
  contact: new RateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 3,
  }),

  // File uploads
  upload: new RateLimiter({
    windowMs: 60 * 1000, 
    maxRequests: 10, 
  }),
};

// Get client IP address
export function getClientIP(request: Request): string {
  // Check for common proxy headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback to connection remote address (for development)
  return request.headers.get('x-client-ip') || 'unknown';
}

export { RateLimiter };