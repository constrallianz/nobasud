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
  
  // Séparons les images du reste des données
  const { images, ...restData } = validatedData
  
  return await prisma.project.create({
    data: {
      ...restData,
      images: JSON.stringify(images)
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
  
  // Séparons les images du reste des données
  const { images, ...restData } = validatedData
  
  return await prisma.project.update({
    where: { id },
    data: {
      ...restData,
      ...(images && { 
        images: JSON.stringify(images)
      })
    }
  })
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id }
  })
}
