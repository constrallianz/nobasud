'use client'

import AuthGuard from '@/components/AuthGuard'
import ArticleListing from '@/components/admin/articles/listing/ArticleListing'
import ArticlePageHeader from '@/components/admin/articles/listing/ArticlePageHeader'
import ArticleStats from '@/components/admin/articles/listing/ArticleStats'
import LoadingState from '@/components/admin/articles/states/LoadingState'
import ErrorState from '@/components/admin/articles/states/ErrorState'
import { useArticles } from '@/components/admin/articles/listing/useArticles'

export default function ArticlesAdminPage() {
  const { articles, isLoading, error, deleteArticle } = useArticles()

  if (isLoading) {
    return (
      <AuthGuard>
        <LoadingState />
      </AuthGuard>
    )
  }

  if (error) {
    return (
      <AuthGuard>
        <ErrorState error={error} />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ArticlePageHeader articlesCount={articles.length} />
        <div className="px-6 py-8">
          <ArticleStats articles={articles} />
          <ArticleListing 
            articles={articles} 
            onDelete={deleteArticle}
            isLoading={isLoading}
          />
        </div>
      </div>
    </AuthGuard>
  )
}
