'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleFormContainer from '@/components/admin/articles/shared/ArticleFormContainer';
import LoadingState from '@/components/admin/articles/states/LoadingState';
import ErrorState from '@/components/admin/articles/states/ErrorState';
import ArticleFormPageHeader from '@/components/admin/articles/shared/ArticleFormPageHeader';
import AuthGuard from '@/components/AuthGuard';
import type { Article } from '@/lib/validations';

export default function NewArticlePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'article');
      }

      router.push('/admin/articles');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <AuthGuard>
        <LoadingState />
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <ErrorState error={error} />
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <ArticleFormPageHeader title="Nouvel Article" />
      <ArticleFormContainer
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Créer l'article"
      />
    </AuthGuard>
  );
}