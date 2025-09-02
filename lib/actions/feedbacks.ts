import { prisma } from '@/lib/prisma'
import { type Feedback, feedbackSchema } from '@/lib/validations'

export async function getFeedbacks() {
  return await prisma.feedback.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getFeedback(id: string) {
  return await prisma.feedback.findUnique({
    where: { id }
  })
}

export async function createFeedback(data: Omit<Feedback, 'id' | 'createdAt'>) {
  const validatedData = feedbackSchema.parse(data)
  
  return await prisma.feedback.create({
    data: validatedData
  })
}

export async function deleteFeedback(id: string) {
  return await prisma.feedback.delete({
    where: { id }
  })
}
