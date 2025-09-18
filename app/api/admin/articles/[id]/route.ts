import { NextResponse } from 'next/server'
import { deleteArticle, updateArticle } from '@/lib/actions/articles'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteArticle(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
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