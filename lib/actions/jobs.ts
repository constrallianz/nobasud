import { prisma } from '@/lib/prisma'
import { type Job, jobSchema } from '@/lib/validations'

export async function getJobs() {
  return await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    where: { published: true }
  })
}

export async function getAllJobs() {
  return await prisma.job.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getJobBySlug(slug: string) {
  return await prisma.job.findUnique({
    where: { slug }
  })
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) {
  const validatedData = jobSchema.parse(data)
  
  return await prisma.job.create({
    data: validatedData
  })
}

export async function updateJob(id: string, data: Partial<Job>) {
  const existingJob = await prisma.job.findUnique({
    where: { id }
  })
  
  if (!existingJob) {
    throw new Error('Job not found')
  }
  
  const validatedData = jobSchema.partial().parse(data)
  
  return await prisma.job.update({
    where: { id },
    data: validatedData
  })
}

export async function deleteJob(id: string) {
  return await prisma.job.delete({
    where: { id }
  })
}
