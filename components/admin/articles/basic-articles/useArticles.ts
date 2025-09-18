import { useState, useEffect } from 'react'
import { type Article } from './ArticleCard'

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/articles')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch articles (${response.status})`)
      }
      
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setArticles(data)
      } else {
        console.error('Unexpected API response format:', data)
        setError('Invalid data format received')
      }
    } catch (err) {
      console.error('Error fetching articles:', err)
      setError(err instanceof Error ? err.message : 'Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id))
  }

  const handleView = (id: string) => {
    // Navigate to article view - this could be implemented later
    console.log('View article:', id)
  }

  const handleEdit = (id: string) => {
    // Navigate to article edit - this could be implemented later
    console.log('Edit article:', id)
  }

  return {
    articles,
    loading,
    error,
    deleteArticle,
    handleView,
    handleEdit,
    refetch: fetchArticles
  }
}