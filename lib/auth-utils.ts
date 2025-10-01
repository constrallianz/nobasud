import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = '7d' // Token expires in 7 days

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

export interface JwtPayload {
  userId: string
  username: string
  email?: string | null
}

/**
 * Generate a JWT token for the given payload
 */
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'nobasud-admin',
    audience: 'nobasud-admin-panel'
  })
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'nobasud-admin',
      audience: 'nobasud-admin-panel'
    }) as JwtPayload
    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error('Password verification failed:', error)
    return false
  }
}

/**
 * Extract JWT token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) return null
  
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null
  }
  
  return parts[1]
}

/**
 * Create a standardized error response for authentication failures
 */
export function createAuthError(message: string = 'Authentication failed', status: number = 401) {
  return {
    error: message,
    status,
    timestamp: new Date().toISOString()
  }
}