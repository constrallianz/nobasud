import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, extractTokenFromHeader, createAuthError, JwtPayload } from './auth-utils'

export interface AuthenticatedRequest extends NextRequest {
  user?: JwtPayload
}

/**
 * Extract JWT token from request (header or cookie)
 */
function extractTokenFromRequest(req: NextRequest): string | null {
  // First try Authorization header
  const authHeader = req.headers.get('Authorization')
  const headerToken = extractTokenFromHeader(authHeader || undefined)
  if (headerToken) return headerToken

  // Then try cookie
  const cookieToken = req.cookies.get('admin-token')?.value
  return cookieToken || null
}

/**
 * Middleware function to verify JWT tokens in API routes
 */
export async function withAuth<T extends any[]>(
  handler: (req: AuthenticatedRequest, ...args: T) => Promise<NextResponse>,
  req: NextRequest,
  ...args: T
): Promise<NextResponse> {
  try {
    const token = extractTokenFromRequest(req)

    if (!token) {
      const error = createAuthError('Access token is required')
      return NextResponse.json(error, { status: error.status })
    }

    const payload = verifyToken(token)
    if (!payload) {
      const error = createAuthError('Invalid or expired token')
      return NextResponse.json(error, { status: error.status })
    }

    // Add user info to request
    ;(req as AuthenticatedRequest).user = payload

    return handler(req as AuthenticatedRequest, ...args)
  } catch (error) {
    console.error('Auth middleware error:', error)
    const authError = createAuthError('Authentication failed', 500)
    return NextResponse.json(authError, { status: authError.status })
  }
}

/**
 * Higher-order function to protect API routes with JWT authentication
 */
export function protectRoute<T extends any[]>(
  handler: (req: AuthenticatedRequest, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T) => {
    return withAuth(handler, req, ...args)
  }
}

/**
 * Verify if the current user has admin privileges
 */
export function requireAdmin(req: AuthenticatedRequest): boolean {
  return !!req.user?.userId
}

/**
 * Create a response with authentication headers
 */
export function createAuthResponse(data: any, token?: string, status: number = 200) {
  const response = NextResponse.json(data, { status })
  
  if (token) {
    response.headers.set('Authorization', `Bearer ${token}`)
    // Set httpOnly cookie for additional security
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })
  }
  
  return response
}