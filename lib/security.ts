/**
 * Security Utilities for API Protection
 * Includes CORS, CSP, and other security headers
 */

export interface SecurityConfig {
  cors?: {
    origin?: string | string[] | boolean;
    methods?: string[];
    allowedHeaders?: string[];
    credentials?: boolean;
  };
  csp?: {
    directives?: Record<string, string | string[]>;
  };
  rateLimiting?: {
    enabled: boolean;
    skipPaths?: string[];
  };
}

// Default security configuration
const defaultConfig: SecurityConfig = {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://nobasud.ma', 'https://www.nobasud.ma'] 
      : true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  },
  csp: {
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://vercel.live'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'img-src': ["'self'", 'data:', 'https:', 'blob:'],
      'connect-src': ["'self'", 'https:', 'ws:', 'wss:'],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
    },
  },
  rateLimiting: {
    enabled: true,
    skipPaths: ['/api/health'],
  },
};

// Build CSP header value
function buildCSPHeader(directives: Record<string, string | string[]>): string {
  return Object.entries(directives)
    .map(([directive, values]) => {
      const valueStr = Array.isArray(values) ? values.join(' ') : values;
      return `${directive} ${valueStr}`;
    })
    .join('; ');
}

// Apply CORS headers
export function applyCORSHeaders(
  response: Response, 
  request: Request, 
  corsConfig: SecurityConfig['cors'] = defaultConfig.cors
): Response {
  const headers = new Headers(response.headers);

  if (corsConfig) {
    // Handle origin
    const requestOrigin = request.headers.get('origin');
    if (corsConfig.origin === true) {
      headers.set('Access-Control-Allow-Origin', '*');
    } else if (typeof corsConfig.origin === 'string') {
      headers.set('Access-Control-Allow-Origin', corsConfig.origin);
    } else if (Array.isArray(corsConfig.origin) && requestOrigin) {
      if (corsConfig.origin.includes(requestOrigin)) {
        headers.set('Access-Control-Allow-Origin', requestOrigin);
      }
    }

    // Handle methods
    if (corsConfig.methods) {
      headers.set('Access-Control-Allow-Methods', corsConfig.methods.join(', '));
    }

    // Handle headers
    if (corsConfig.allowedHeaders) {
      headers.set('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(', '));
    }

    // Handle credentials
    if (corsConfig.credentials) {
      headers.set('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight
    headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Apply security headers
export function applySecurityHeaders(
  response: Response, 
  config: SecurityConfig = defaultConfig
): Response {
  const headers = new Headers(response.headers);

  // Content Security Policy
  if (config.csp?.directives) {
    headers.set('Content-Security-Policy', buildCSPHeader(config.csp.directives));
  }

  // Security headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // HSTS for HTTPS
  if (process.env.NODE_ENV === 'production') {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Input sanitization helpers
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Request size validation
export function validateRequestSize(request: Request, maxSize: number = 1024 * 1024): boolean {
  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    return size <= maxSize;
  }
  return true; // Allow if no content-length header
}

export { defaultConfig };