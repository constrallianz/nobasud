import { NextResponse } from 'next/server'
import { updateArticle, deleteArticle } from '@/lib/actions/articles'
import { prisma } from '@/lib/prisma'
import { protectRoute, AuthenticatedRequest } from '@/lib/auth-middleware'

async function getArticleHandler(
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id }
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

async function updateArticleHandler(
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const article = await updateArticle(params.id, data)
    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

async function deleteArticleHandler(
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteArticle(params.id)
    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}

export const GET = protectRoute(getArticleHandler)
export const PUT = protectRoute(updateArticleHandler)
export const DELETE = protectRoute(deleteArticleHandler)