import { NextResponse } from 'next/server'
import { saveUpload } from '@/lib/storage'
import { createFeedback } from '@/lib/actions/feedbacks'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const anonymous = !!formData.get('anonymous')
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const subject = String(formData.get('subject') || '')
    const zone = String(formData.get('zone') || '')
    const message = String(formData.get('message') || '')
    const photo = formData.get('photo') as File | null

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 })
    }
    
    const photoUrl = photo ? await saveUpload(photo, 'feedback') : undefined
    
    const feedback = await createFeedback({ 
      anonymous, 
      name, 
      email, 
      subject, 
      zone, 
      message, 
      photoUrl 
    })
    
    return NextResponse.json({ id: feedback.id }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
