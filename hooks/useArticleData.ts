import { useState, useEffect } from 'react'
import { getImageUrl, getReadTime } from '@/lib/media-utils'
import { Article } from '@/types/media'

interface ArticleWithExtras extends Article {
  imageUrl?: string
  readTime?: string
}

interface UseArticleDataReturn {
  article: Article | null
  relatedArticles: ArticleWithExtras[]
  loading: boolean
  error: string | null
}

export function useArticleData(slug: string): UseArticleDataReturn {
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<ArticleWithExtras[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/articles?slug=${slug}`)
        
        if (!res.ok) {
          throw new Error('Failed to fetch article')
        }

        const data = await res.json()
        
        setArticle(data.article)
        setRelatedArticles(
          (data.relatedArticles || []).map((a: any) => ({
            ...a,
            imageUrl: getImageUrl(a),
            readTime: getReadTime(a.content),
          }))
        )
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err instanceof Error ? err.message : 'Error fetching article')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  return {
    article,
    relatedArticles,
    loading,
    error,
  }
}
