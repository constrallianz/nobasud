import { prisma } from '@/lib/prisma'
import { type Project, projectSchema } from '@/lib/validations'

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: { slug }
  })
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
  const validatedData = projectSchema.parse({
    ...data,
    images: data.images || []
  })
  
  return await prisma.project.create({
    data: {
      ...validatedData,
      images: JSON.stringify(validatedData.images)
    }
  })
}

export async function updateProject(id: string, data: Partial<Project>) {
  const existingProject = await prisma.project.findUnique({
    where: { id }
  })
  
  if (!existingProject) {
    throw new Error('Project not found')
  }
  
  const validatedData = projectSchema.partial().parse(data)
  
  return await prisma.project.update({
    where: { id },
    data: {
      ...validatedData,
      ...(validatedData.images && { 
        images: JSON.stringify(validatedData.images)
      })
    }
  })
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id }
  })
}
