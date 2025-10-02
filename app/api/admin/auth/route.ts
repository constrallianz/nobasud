import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, createAuthError } from '@/lib/auth-utils'
import { createAuthResponse } from '@/lib/auth-middleware'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body
    

    if (!username || !password) {

      const error = createAuthError('Username and password are required', 400)
      return NextResponse.json(error, { status: error.status })
    }
    
    if (typeof username !== 'string' || typeof password !== 'string') {
      const error = createAuthError('Invalid credentials format', 400)
      return NextResponse.json(error, { status: error.status })
    }
    
    // Find active admin user
    const adminUser = await prisma.adminUser.findUnique({
      where: { 
        username: username.trim(),
        active: true
      }
    })
    
    if (!adminUser) {
      const error = createAuthError('Invalid credentials')
      return NextResponse.json(error, { status: error.status })
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, adminUser.password)
    
    if (!isPasswordValid) {
      const error = createAuthError('Invalid credentials')
      return NextResponse.json(error, { status: error.status })
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: adminUser.id,
      username: adminUser.username,
      email: adminUser.email || undefined
    })
    
    // Update last login timestamp
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { lastLogin: new Date() }
    })
    
    // Return success response with token
    const responseData = {
      success: true,
      token,
      user: {
        id: adminUser.id,
        username: adminUser.username,
        name: adminUser.name,
        email: adminUser.email
      }
    }
    
    return createAuthResponse(responseData, token)
    
  } catch (error) {
    console.error('Authentication error:', error)
    const authError = createAuthError('Authentication service unavailable', 500)
    return NextResponse.json(authError, { status: authError.status })
  }
}

/**
 * Logout endpoint - invalidate token (client-side handling)
 */
export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' })
    
    // Clear the httpOnly cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}