'use client'
import { useState, useEffect } from 'react'
import { Article, Category } from '@/types/media'
import MediaHero from '@/components/media/MediaHero'
import MediaCategories from '@/components/media/MediaCategories'
import FeaturedArticle from '@/components/media/FeaturedArticle'
import ArticlesGrid from '@/components/media/ArticlesGrid'
import Newsletter from '@/components/media/Newsletter'

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories: Category[] = [
    { id: 'all', name: 'Tous les articles', count: articles.length },
    { id: 'actualites', name: 'Actualités', count: articles.filter(a => a.tags?.includes('Actualités')).length },
    { id: 'projets', name: 'Nos projets', count: articles.filter(a => a.tags?.includes('Projets')).length },
    { id: 'innovation', name: 'Innovation', count: articles.filter(a => a.tags?.includes('Innovation')).length },
    { id: 'conseils', name: 'Conseils', count: articles.filter(a => a.tags?.includes('Conseils')).length }
  ]

  const featuredArticle = articles.length > 0 ? articles[0] : null

  const getReadTime = (content: string | null) => {
    if (!content) return '3 min'
    const words = content.split(' ').length
    return `${Math.ceil(words / 200)} min`
  }

  const getImageUrl = (article: Article) => {
    return article.coverImageUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesCategory = selectedCategory === 'all' || 
                           (article.tags?.includes(selectedCategory) ?? false)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative">
      <MediaHero 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <MediaCategories 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      <FeaturedArticle 
        article={featuredArticle}
        loading={loading}
        getImageUrl={getImageUrl}
        getReadTime={getReadTime}
      />
      
      <ArticlesGrid 
        articles={filteredArticles}
        loading={loading}
        searchTerm={searchTerm}
        getImageUrl={getImageUrl}
        getReadTime={getReadTime}
      />
      
      <Newsletter />
    </div>
  )
}
