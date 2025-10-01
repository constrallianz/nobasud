import { NextRequest } from 'next/server'
import { protectRoute, AuthenticatedRequest } from '@/lib/auth-middleware'
import { NextResponse } from 'next/server'

async function verifyHandler(req: AuthenticatedRequest) {
  try {
    // If we reach here, the token is valid (middleware verified it)
    const user = req.user!
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.userId,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Verify endpoint error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}

export const GET = protectRoute(verifyHandler)