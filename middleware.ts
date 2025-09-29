import { NextRequest, NextResponse } from 'next/server';
import { rateLimiters, getClientIP } from './lib/rate-limiter';
import { applyCORSHeaders, applySecurityHeaders, validateRequestSize } from './lib/security';

// Paths that require different rate limiting
const RATE_LIMIT_PATHS = {
  auth: ['/api/admin/login', '/api/admin/auth'],
  contact: ['/api/contact', '/api/feedback'],
  upload: ['/api/upload'],
  api: ['/api'], // Default for all other API routes
};

// Paths to skip rate limiting entirely
const SKIP_RATE_LIMIT_PATHS = [
  '/api/health',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

function getRateLimiterForPath(pathname: string) {
  // Check specific paths first
  if (RATE_LIMIT_PATHS.auth.some(path => pathname.startsWith(path))) {
    return rateLimiters.auth;
  }
  if (RATE_LIMIT_PATHS.contact.some(path => pathname.startsWith(path))) {
    return rateLimiters.contact;
  }
  if (RATE_LIMIT_PATHS.upload.some(path => pathname.startsWith(path))) {
    return rateLimiters.upload;
  }
  if (pathname.startsWith('/api')) {
    return rateLimiters.api;
  }
  
  return null; // No rate limiting for non-API routes
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for certain paths
  if (SKIP_RATE_LIMIT_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 });
    return applyCORSHeaders(response, request);
  }

  // Validate request size
  if (!validateRequestSize(request, 10 * 1024 * 1024)) { // 10MB limit
    return new NextResponse(
      JSON.stringify({ 
        error: 'Request too large',
        message: 'Request body exceeds maximum allowed size' 
      }),
      { 
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Apply rate limiting for API routes
  const rateLimiter = getRateLimiterForPath(pathname);
  if (rateLimiter) {
    const clientIP = getClientIP(request);
    const { allowed, remaining, resetTime, retryAfter } = rateLimiter.checkLimit(clientIP);

    if (!allowed) {
      const response = new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryAfter: retryAfter || 60,
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': rateLimiter['config'].maxRequests.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
            'Retry-After': (retryAfter || 60).toString(),
          }
        }
      );
      
      return applySecurityHeaders(applyCORSHeaders(response, request));
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', rateLimiter['config'].maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());
    
    return applySecurityHeaders(applyCORSHeaders(response, request));
  }

  // Apply security headers to all responses
  const response = NextResponse.next();
  return applySecurityHeaders(applyCORSHeaders(response, request));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};