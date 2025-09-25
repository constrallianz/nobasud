import { NextResponse } from 'next/server'
import { getProjects, createProject } from '@/lib/actions/projects'
import { uploadBufferToCloudinary } from '@/lib/cloudinary'
import { projectSchema } from '@/lib/validations'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()

      // Get existing image URLs
      const existingImages = JSON.parse((form.get('images') as string) || '[]')
      let uploadedImages: string[] = [...existingImages]

      // Upload new files to Cloudinary
      const files = form.getAll('imageFiles') as File[]
      for (const file of files) {
        if (file && file.size > 0) {
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const result: any = await uploadBufferToCloudinary(buffer, 'nobasud/projects')
          uploadedImages.push(result.secure_url)
        }
      }

      const raw = {
        name: (form.get('name') as string) || '',
        slug: (form.get('slug') as string) || '',
        type: (form.get('type') as string) || '',
        location: (form.get('location') as string) || '',
        description: (form.get('description') as string) || '',
        images: uploadedImages,
      }

      const data = projectSchema.parse(raw)
      const project = await createProject(data)
      return NextResponse.json(project, { status: 201 })
    }

    // Handle JSON requests (fallback)
    const body = await request.json()
    const data = projectSchema.parse(body)
    const project = await createProject(data)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
