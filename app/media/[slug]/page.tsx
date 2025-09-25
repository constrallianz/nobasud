import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ArticleContent from '@/components/media/article/ArticleContent'
import ArticleHeader from '@/components/media/article/ArticleHeader'
import RelatedArticles from '@/components/media/article/RelatedArticles'
import { getImageUrl, getReadTime, parseArticleTags } from '@/lib/media-utils'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { 
      slug: params.slug,
      published: true
    }
  })

  if (!article) {
    return {
      title: 'Article non trouvé'
    }
  }

  return {
    title: `${article.title} | NOBASUD`,
    description: article.excerpt || 'Découvrez cet article de NOBASUD',
    openGraph: {
      title: article.title,
      description: article.excerpt || 'Découvrez cet article de NOBASUD',
      images: article.coverImageUrl ? [article.coverImageUrl] : [],
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
    },
  }
}

// Generate static params for ISR
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
    take: 100 
  })

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { 
      slug: params.slug,
      published: true
    }
  })

  if (!article) {
    notFound()
  }

  const tags = parseArticleTags(article.tags)
  const relatedArticles = await prisma.article.findMany({
    where: {
      published: true,
      id: { not: article.id },
      OR: tags.length > 0 ? tags.map(tag => ({
        tags: { contains: tag }
      })) : undefined
    },
    orderBy: { publishedAt: 'desc' },
    take: 3
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ArticleHeader 
        article={article}
        imageUrl={getImageUrl(article)}
        readTime={getReadTime(article.content)}
        tags={tags}
      />
      
      <ArticleContent 
        article={article}
        readTime={getReadTime(article.content)}
      />
      
      {relatedArticles.length > 0 && (
        <RelatedArticles 
          articles={relatedArticles}
          getImageUrl={getImageUrl}
          getReadTime={getReadTime}
        />
      )}
    </div>
  )
}