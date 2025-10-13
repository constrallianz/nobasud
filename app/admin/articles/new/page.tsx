'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleFormContainer from '@/components/admin/articles/shared/ArticleFormContainer';
import LoadingState from '@/components/admin/articles/states/LoadingState';
import ErrorState from '@/components/admin/articles/states/ErrorState';
import ArticleFormPageHeader from '@/components/admin/articles/shared/ArticleFormPageHeader';
import AuthGuard from '@/components/AuthGuard';
import type { Article } from '@/lib/validations';
import { useArticles } from '@/components/admin/articles/basic-articles/useArticles';

export default function NewArticlePage() {
  const { createArticle } = useArticles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: Omit<Article, 'id'|'createdAt'|'updatedAt'>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const form = new FormData();
      form.append('title', data.title ?? '');
      form.append('slug', data.slug ?? '');
      form.append('excerpt', data.excerpt ?? '');
      form.append('content', data.content ?? '');
      form.append('published', String(!!data.published));
      form.append('publishedAt', new Date(data.publishedAt as any).toISOString());
      form.append('tags', JSON.stringify(Array.isArray((data as any).tags) ? (data as any).tags : []));

      // prefer file over URL
      if ((data as any).coverImage instanceof File) {
        form.append('coverImage', (data as any).coverImage);
      } else if ((data as any).coverImageUrl) {
        form.append('coverImageUrl', String((data as any).coverImageUrl));
      }

      const result = await createArticle(form);
      
      if (result.success) {
        router.push('/admin/articles');
      } else {
        setError(result.error || 'Une erreur est survenue');
      }
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