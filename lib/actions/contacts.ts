import { prisma } from '@/lib/prisma'
import { type Contact, contactSchema } from '@/lib/validations'

export async function getContactMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getContactMessage(id: string) {
  return await prisma.contactMessage.findUnique({
    where: { id }
  })
}

export async function createContactMessage(data: Omit<Contact, 'id' | 'createdAt'>) {
  const validatedData = contactSchema.parse(data)
  
  return await prisma.contactMessage.create({
    data: validatedData
  })
}

export async function deleteContactMessage(id: string) {
  return await prisma.contactMessage.delete({
    where: { id }
  })
}
