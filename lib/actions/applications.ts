import { prisma } from '@/lib/prisma'
import { type Application, applicationSchema } from '@/lib/validations'

export async function getApplications() {
  return await prisma.application.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getApplication(id: string) {
  return await prisma.application.findUnique({
    where: { id }
  })
}

export async function createApplication(data: Omit<Application, 'id' | 'createdAt'>) {
  const validatedData = applicationSchema.parse(data)
  
  return await prisma.application.create({
    data: validatedData
  })
}

export async function deleteApplication(id: string) {
  return await prisma.application.delete({
    where: { id }
  })
}
