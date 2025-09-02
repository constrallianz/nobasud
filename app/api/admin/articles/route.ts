import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/actions/articles'

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json({ items: articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
