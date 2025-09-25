import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

// GET - Fetch feedbacks with optional published filter
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const publishedOnly = searchParams.get('published') === 'true'
    
    const feedbacks = await prisma.feedback.findMany({
      where: publishedOnly ? { published: true } : {},
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(feedbacks)
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}