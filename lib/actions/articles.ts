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
  
  return await prisma.article.create({
    data: {
      ...validatedData,
      tags: JSON.stringify(validatedData.tags),
      publishedAt: validatedData.publishedAt || new Date()
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
  
  return await prisma.article.update({
    where: { id },
    data: {
      ...validatedData,
      ...(validatedData.tags && { 
        tags: JSON.stringify(validatedData.tags)
      })
    }
  })
}

export async function deleteArticle(id: string) {
  return await prisma.article.delete({
    where: { id }
  })
}
