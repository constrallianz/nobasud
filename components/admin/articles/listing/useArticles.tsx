'use client';

import { useState, useEffect } from 'react';
import type { Article } from '@/lib/validations';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/articles');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des articles');
      }
      
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticleById = async (id: string): Promise<Article | null> => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`);
      if (!response.ok) {
        throw new Error('Article non trouvé');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching article:', err);
      return null;
    }
  };

  const updateArticle = async (id: string, data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; error?: string }> => {
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

  const deleteArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      // Remove the article from the local state
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    isLoading,
    error,
    fetchArticleById,
    updateArticle,
    createArticle,
    deleteArticle,
    refetch: fetchArticles,
  };
}