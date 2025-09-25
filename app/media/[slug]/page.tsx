import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import MainArticle from '@/components/media/article/MainArticle'

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

  return (
    <MainArticle params={params} />
  )
}
