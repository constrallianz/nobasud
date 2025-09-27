import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getJobBySlug } from '@/lib/actions/jobs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (slug) {
      const job = await getJobBySlug(slug)
      if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 })
      }
      return NextResponse.json(job)
    }

    const jobs = await prisma.job.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}