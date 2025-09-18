import { prisma } from '@/lib/prisma'

export async function getFeedbacks() {
  return await prisma.feedback.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getPublishedFeedbacks() {
  return await prisma.feedback.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getFeedback(id: string) {
  return await prisma.feedback.findUnique({
    where: { id }
  })
}

export async function createFeedback(data: {
  name: string
  email: string
  company?: string
  project: string
  rating: number
  message: string
  published?: boolean
}) {
  return await prisma.feedback.create({
    data: {
      ...data,
      published: data.published ?? false
    }
  })
}

export async function updateFeedback(id: string, data: Partial<{
  name: string
  email: string
  company: string
  project: string
  rating: number
  message: string
  published: boolean
}>) {
  return await prisma.feedback.update({
    where: { id },
    data
  })
}

export async function deleteFeedback(id: string) {
  return await prisma.feedback.delete({
    where: { id }
  })
}
