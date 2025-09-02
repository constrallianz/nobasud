import { prisma } from '@/lib/prisma'
import { type Article, articleSchema } from '@/lib/validations'

export async function getArticles() {
  return await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
    where: { published: true }
  })
}

export async function getAllArticles() {
  return await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' }
  })
}

export async function getArticleBySlug(slug: string) {
  return await prisma.article.findUnique({
    where: { slug }
  })
}

export async function createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) {
  const validatedData = articleSchema.parse({
    ...data,
    tags: data.tags || []
  })
  
  // Séparons les tags du reste des données
  const { tags, ...restData } = validatedData
  
  return await prisma.article.create({
    data: {
      ...restData,
      tags: JSON.stringify(tags),
      publishedAt: restData.publishedAt || new Date()
    }
  })
}

export async function updateArticle(id: string, data: Partial<Article>) {
  const existingArticle = await prisma.article.findUnique({
    where: { id }
  })
  
  if (!existingArticle) {
    throw new Error('Article not found')
  }
  
  const validatedData = articleSchema.partial().parse(data)
  
  // Séparons les tags du reste des données pour éviter les conflits de types
  const { tags, ...restData } = validatedData
  
  return await prisma.article.update({
    where: { id },
    data: {
      ...restData,
      ...(tags && { 
        tags: JSON.stringify(tags)
      })
    }
  })
}

export async function deleteArticle(id: string) {
  return await prisma.article.delete({
    where: { id }
  })
}
