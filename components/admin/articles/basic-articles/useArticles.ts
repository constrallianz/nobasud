import { useState, useEffect } from 'react'
import { type Article } from './ArticleCard'
import { Article as ArticleValidation } from '@/lib/validations';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticleById = async (id: string): Promise<ArticleValidation | null> => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  };

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
        setError('Invalid data format received')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const updateArticle = async (id: string, data: Omit<ArticleValidation, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'article');
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue',
      };
    }
  };

  const createArticle = async (data: FormData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'article');
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue',
      };
    }
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id))
  }

  const handleView = (id: string) => {
  }

  const handleEdit = (id: string) => {
  }

  return {
    articles,
    loading,
    error,
    deleteArticle,
    handleView,
    handleEdit,
    refetch: fetchArticles,
    fetchArticleById,
    updateArticle,
    createArticle
  }
}