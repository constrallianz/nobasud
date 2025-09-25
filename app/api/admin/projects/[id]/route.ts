import { NextResponse } from 'next/server'
import { updateProject, deleteProject } from '@/lib/actions/projects'
import { uploadBufferToCloudinary } from '@/lib/cloudinary'
import { projectSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      const project = await updateProject(params.id, data)
      return NextResponse.json(project)
    }

    // Handle JSON requests (fallback)
    const body = await request.json()
    const data = projectSchema.parse(body)
    const project = await updateProject(params.id, data)
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteProject(params.id)
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}