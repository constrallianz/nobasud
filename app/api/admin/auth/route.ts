import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const username = String(formData.get('username') || '')
    const password = String(formData.get('password') || '')
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }
    
    // Find admin user by username
    const adminUser = await prisma.adminUser.findUnique({
      where: { 
        username: username,
        active: true
      }
    })
    
    if (!adminUser || adminUser.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    // Update last login
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { lastLogin: new Date() }
    })
    
    return NextResponse.json({ 
      success: true,
      user: {
        id: adminUser.id,
        username: adminUser.username,
        name: adminUser.name,
        email: adminUser.email
      }
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}