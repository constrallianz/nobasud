import { NextResponse } from 'next/server'
import { saveUpload } from '@/lib/storage'
import { createApplication } from '@/lib/actions/applications'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const message = String(formData.get('message') || '')
    const cv = formData.get('cv') as File | null
    const coverLetter = formData.get('coverLetter') as File | null
    
    if (!name || !email || !cv) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const cvUrl = cv ? await saveUpload(cv, 'cv') : ''
    const coverLetterUrl = coverLetter ? await saveUpload(coverLetter, 'letters') : undefined
    
    const application = await createApplication({ 
      name, 
      email, 
      message, 
      cvUrl, 
      coverLetterUrl 
    })
    
    return NextResponse.json({ id: application.id }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
