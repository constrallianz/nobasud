import { useState, useEffect, useMemo } from 'react'
import { Article, Category } from '@/types/media'

export function useMediaData() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/articles')
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }
        
        const data = await response.json()
        setArticles(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching articles:', error)
        setError(error instanceof Error ? error.message : 'Failed to load articles')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const parseArticleTags = (tags: string | null): string[] => {
    if (!tags) return []
    try {
      return Array.isArray(tags) ? tags : JSON.parse(tags)
    } catch {
      return []
    }
  }

  const categories: Category[] = useMemo(() => {
    const tagCounts: Record<string, number> = {}
    
    articles.forEach(article => {
      const tags = parseArticleTags(article.tags)
      tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    const dynamicCategories: Category[] = [
      { id: 'all', name: 'Tous les articles', count: articles.length }
    ]

    const commonCategories = ['Actualités', 'Projets', 'Innovation', 'Conseils']
    commonCategories.forEach(cat => {
      if (tagCounts[cat]) {
        dynamicCategories.push({
          id: cat.toLowerCase(),
          name: cat,
          count: tagCounts[cat]
        })
      }
    })

    return dynamicCategories
  }, [articles])

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      
      if (selectedCategory === 'all') return matchesSearch
      
      const tags = parseArticleTags(article.tags)
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name
      const matchesCategory = categoryName ? tags.includes(categoryName) : false
      
      return matchesSearch && matchesCategory
    })
  }, [articles, searchTerm, selectedCategory, categories])

  const featuredArticle = useMemo(() => {
    return articles.find(article => article.published) || null
  }, [articles])

  const remainingArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles
    return filteredArticles.filter(article => article.id !== featuredArticle.id)
  }, [filteredArticles, featuredArticle])

  return {
    // State
    searchTerm,
    selectedCategory,
    articles,
    loading,
    error,
    
    // Derived data
    categories,
    featuredArticle,
    filteredArticles: remainingArticles,
    
    // Actions
    setSearchTerm,
    setSelectedCategory,
    
    // Utilities
    parseArticleTags
  }
}