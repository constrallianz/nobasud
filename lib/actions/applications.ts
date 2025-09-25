import { prisma } from '@/lib/prisma'
import { type Application } from '@/lib/validations'

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

export async function createApplication(data: Omit<Application, 'id' | 'createdAt' | 'status'>) {
  return await prisma.application.create({
    data: {
      name: data.name,
      email: data.email,
      cvUrl: data.cvUrl,
      coverLetterUrl: data.coverLetterUrl,
      message: data.message,
      // status will default to 'nouveau' as defined in schema
    }
  })
}

export async function deleteApplication(id: string) {
  await prisma.application.delete({
    where: { id }
  })
  
  return { success: true }
}
