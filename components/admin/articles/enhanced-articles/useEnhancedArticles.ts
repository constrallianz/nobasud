import { useState, useEffect, useMemo } from 'react'
import { type EnhancedArticle } from './EnhancedArticleCard'

export function useEnhancedArticles() {
  const [articles, setArticles] = useState<EnhancedArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Mock data - in a real app, this would be an API call
  useEffect(() => {
    const loadArticles = () => {
      setTimeout(() => {
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
        setLoading(false)
      }, 800)
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

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setArticles(prev => prev.filter(article => article.id !== id))
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
    handleDelete
  }
}