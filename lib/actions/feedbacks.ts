import { prisma } from '@/lib/prisma'
import { type Feedback, feedbackSchema } from '@/lib/validations'

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

export async function getFeedbackById(id: string) {
  return await prisma.feedback.findUnique({
    where: { id }
  })
}

// Keep legacy function for backward compatibility
export async function getFeedback(id: string) {
  return getFeedbackById(id)
}

export async function createFeedback(data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) {
  const validatedData = feedbackSchema.parse(data)
  
  // Remove system fields from the data before creation
  const { id, createdAt, updatedAt, ...feedbackData } = validatedData
  
  return await prisma.feedback.create({
    data: {
      ...feedbackData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })
}

export async function updateFeedback(id: string, data: Partial<Feedback>) {
  const existingFeedback = await prisma.feedback.findUnique({
    where: { id }
  })
  
  if (!existingFeedback) {
    throw new Error('Feedback not found')
  }
  
  // Merge with existing data to ensure full validation
  const mergedData = {
    ...existingFeedback,
    ...data,
    updatedAt: new Date()
  }
  
  const validatedData = feedbackSchema.parse(mergedData)
  
  // Remove system fields from update data
  const { id: _, createdAt, updatedAt, ...updateData } = validatedData
  
  return await prisma.feedback.update({
    where: { id },
    data: {
      ...updateData,
      updatedAt: new Date()
    }
  })
}

export async function deleteFeedback(id: string) {
  return await prisma.feedback.delete({
    where: { id }
  })
}

export async function toggleFeedbackPublished(id: string) {
  const feedback = await prisma.feedback.findUnique({
    where: { id }
  })
  
  if (!feedback) {
    throw new Error('Feedback not found')
  }
  
  return await prisma.feedback.update({
    where: { id },
    data: {
      published: !feedback.published,
      updatedAt: new Date()
    }
  })
}
