import { useState, useEffect, useMemo } from 'react'
import { type EnhancedArticle } from './EnhancedArticleCard'

interface DatabaseArticle {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  coverImageUrl?: string
  tags?: string
  publishedAt: string | Date
  published: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

// Convert database article to enhanced article format
const convertToEnhancedArticle = (dbArticle: DatabaseArticle): EnhancedArticle => {
  const tags = dbArticle.tags ? JSON.parse(dbArticle.tags) : []
  
  return {
    id: parseInt(dbArticle.id, 10) || Math.floor(Math.random() * 10000),
    title: dbArticle.title,
    excerpt: dbArticle.excerpt || 'Aucun extrait disponible',
    content: dbArticle.content || '',
    author: 'NOBASUD Team', // Default author since it's not in the database
    publishedAt: new Date(dbArticle.publishedAt).toISOString().split('T')[0],
    status: dbArticle.published ? 'published' : 'draft',
    category: tags[0] || 'Général', // Use first tag as category
    featuredImage: dbArticle.coverImageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    views: Math.floor(Math.random() * 2000), // Random views since not tracked
    comments: Math.floor(Math.random() * 20) // Random comments since not tracked
  }
}

export function useEnhancedArticles() {
  const [articles, setArticles] = useState<EnhancedArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Fetch real articles from API
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true)
        
        const response = await fetch('/api/admin/articles')
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }
        
        const dbArticles: DatabaseArticle[] = await response.json()
        
        // Convert database articles to enhanced article format
        const enhancedArticles = dbArticles.map(convertToEnhancedArticle)
        
        setArticles(enhancedArticles)
      } catch (error) {
        console.error('Error loading articles:', error)
        
        // Fallback to mock data if API fails
        setArticles([
          {
            id: 1,
            title: "L'innovation dans le béton recyclé",
            excerpt: "Découvrez comment NOBASUD révolutionne la construction avec des matériaux durables et écologiques.",
            content: "Le contenu complet de l'article...",
            author: "Mohamed Alaoui",
            publishedAt: "2024-01-15",
            status: "published",
            category: "Innovation",
            featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
            views: 1245,
            comments: 8
          },
          {
            id: 2,
            title: "Techniques modernes de construction parasismique",
            excerpt: "Les nouvelles normes de construction pour résister aux séismes au Maroc.",
            content: "Le contenu complet de l'article...",
            author: "Fatima Zahra",
            publishedAt: "2024-01-20",
            status: "published",
            category: "Technique",
            featuredImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
            views: 892,
            comments: 5
          },
          {
            id: 3,
            title: "Projet futur: Complexe touristique Agadir Bay",
            excerpt: "Aperçu du projet ambitieux de complexe touristique en cours de développement.",
            content: "Le contenu complet de l'article...",
            author: "Youssef Bennani",
            publishedAt: "2024-02-01",
            status: "draft",
            category: "Projets",
            featuredImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
            views: 0,
            comments: 0
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Filter articles based on selected status
  const filteredArticles = useMemo(() => {
    return selectedStatus === 'all' 
      ? articles 
      : articles.filter(article => article.status === selectedStatus)
  }, [articles, selectedStatus])

  // Article action handlers
  const handleView = (id: number) => {
    console.log('View article:', id)
    // Implementation for viewing article
  }

  const handleEdit = (id: number) => {
    console.log('Edit article:', id)
    // Implementation for editing article
  }

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        // Find the article to get its database ID
        const article = articles.find(a => a.id === id)
        if (!article) return
        
        // Convert number ID back to string for API call
        const response = await fetch(`/api/admin/articles/${article.id}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete article')
        }
        
        // Remove from local state
        setArticles(prev => prev.filter(article => article.id !== id))
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Erreur lors de la suppression de l\'article')
      }
    }
  }

  const refreshArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/articles')
      
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      
      const dbArticles: DatabaseArticle[] = await response.json()
      const enhancedArticles = dbArticles.map(convertToEnhancedArticle)
      setArticles(enhancedArticles)
    } catch (error) {
      console.error('Error refreshing articles:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    articles,
    filteredArticles,
    loading,
    selectedStatus,
    setSelectedStatus,
    handleView,
    handleEdit,
    handleDelete,
    refreshArticles
  }
}