'use client'

import AuthGuard from '@/components/AuthGuard'
import ArticleCard from '@/components/admin/articles/basic-articles/ArticleCard'
import ArticleStats from '@/components/admin/articles/basic-articles/ArticleStats'
import { 
  PageHeader, 
  LoadingState, 
  ErrorState, 
  EmptyState, 
  ArticlesList 
} from '@/components/admin/articles/basic-articles/ArticlePageStates'
import { useArticles } from '@/components/admin/articles/basic-articles/useArticles'

export default function ArticlesAdminPage() {
  const { articles, loading, error, deleteArticle, handleView, handleEdit } = useArticles()

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <PageHeader articlesCount={articles.length} />

        <div className="px-6 py-8">
          <ArticleStats articles={articles} />

          {articles.length > 0 ? (
            <ArticlesList>
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onDelete={deleteArticle}
                  onEdit={handleEdit}
                  onView={handleView}
                />
              ))}
            </ArticlesList>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
