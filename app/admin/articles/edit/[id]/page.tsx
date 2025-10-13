'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ArticleFormContainer from '@/components/admin/articles/shared/ArticleFormContainer';
import LoadingState from '@/components/admin/articles/states/LoadingState';
import ErrorState from '@/components/admin/articles/states/ErrorState';
import ArticleFormPageHeader from '@/components/admin/articles/shared/ArticleFormPageHeader';
import AuthGuard from '@/components/AuthGuard';
import type { Article } from '@/lib/validations';
import { useArticles } from '@/components/admin/articles/basic-articles/useArticles';

export default function EditArticlePage() {
  const { fetchArticleById, updateArticle } = useArticles();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(articleId);
        if (!data) throw new Error('Article non trouvé');
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      } finally {
        setIsLoading(false);
      }
    };
    if (articleId) {
      loadArticle();
    }
  }, [articleId, fetchArticleById]);

  const handleSubmit = async (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    setError(null);

    const result = await updateArticle(articleId, data);
    
    if (result.success) {
      router.push('/admin/articles');
    } else {
      setError(result.error || 'Une erreur est survenue');
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <LoadingState />
      </AuthGuard>
    );
  }

  if (error || !article) {
    return (
      <AuthGuard>
        <ErrorState error={error || 'Article non trouvé'} />
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <ArticleFormPageHeader title={`Modifier: ${article.title}`} />
      <ArticleFormContainer
        initialData={article}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Mettre à jour"
      />
    </AuthGuard>
  );
}