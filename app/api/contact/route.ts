import { NextResponse } from 'next/server'
import { createContactMessage } from '@/lib/actions/contacts'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const message = String(formData.get('message') || '')
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const contact = await createContactMessage({ name, email, message })
    
    return NextResponse.json({ id: contact.id }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
