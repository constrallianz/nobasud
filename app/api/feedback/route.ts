import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadBufferToCloudinary } from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const testimonials = await prisma.feedback.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const company = String(formData.get('company') || '') || null
    const project = String(formData.get('project') || '')
    const rating = parseInt(String(formData.get('rating') || '0'))
    const message = String(formData.get('comment') || '')

    let photoUrl: string | null = null;
    const file = formData.get('photo') as File | null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // @ts-ignore
      const result: any = await uploadBufferToCloudinary(buffer, 'nobasud/feedback');
      photoUrl = result.secure_url;
    }
    if (!name || !email || !project || !rating || !message) {
      return NextResponse.json({ 
        error: 'Name, email, project, rating and message are required' 
      }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ 
        error: 'Rating must be between 1 and 5' 
      }, { status: 400 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        company,
        project,
        rating,
        message,
        photoUrl,
        published: false 
      }
    })

    return NextResponse.json({ id: feedback.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating feedback:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
