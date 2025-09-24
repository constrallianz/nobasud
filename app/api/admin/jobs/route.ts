import { NextResponse } from 'next/server'
import { getAllJobs, createJob } from '@/lib/actions/jobs'
import { uploadBufferToCloudinary } from '@/lib/cloudinary';
import { jobSchema } from '@/lib/validations';


const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let draft: Record<string, any> = {}
    let imageUrl = ''

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      const file = form.get('image') as File | null
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const result: any = await uploadBufferToCloudinary(buffer, 'nobasud/jobs')
        imageUrl = result.secure_url
      }
      for (const [key, value] of form.entries()) {
        if (key === 'image') continue
        draft[key] = typeof value === 'string' ? value : String(value)
      }
    } else {
      draft = await request.json()
    }

    const title: string = (draft.title ?? '').toString()
    const slug = draft.slug ? String(draft.slug) : slugify(title)

    const parsed = jobSchema.parse({
      ...draft,
      slug,
      imageUrl: imageUrl || draft.imageUrl || null,
      published: draft.published ?? true,
      deadline: draft.deadline ? new Date(draft.deadline) : null,
    })

    const job = await createJob(parsed) 
    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}
export async function GET() {
  try {
    const jobs = await getAllJobs()
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
