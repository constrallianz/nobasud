import { NextResponse } from 'next/server'
import { getFeedbacks, deleteFeedback } from '@/lib/actions/feedbacks'

export async function GET() {
  try {
    const feedbacks = await getFeedbacks()
    return NextResponse.json(feedbacks)
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Feedback ID is required' }, { status: 400 })
    }

    await deleteFeedback(id)
    return NextResponse.json({ message: 'Feedback deleted successfully' })
  } catch (error) {
    console.error('Error deleting feedback:', error)
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 })
  }
}