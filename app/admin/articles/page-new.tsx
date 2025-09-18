'use client'

import EnhancedArticleCard from '@/components/admin/articles/enhanced-articles/EnhancedArticleCard'
import EnhancedArticleStats from '@/components/admin/articles/enhanced-articles/EnhancedArticleStats'
import ArticleFilters from '@/components/admin/articles/enhanced-articles/ArticleFilters'
import EnhancedPageHeader, { LoadingState, EmptyState } from '@/components/admin/articles/enhanced-articles/EnhancedPageHeader'
import { useEnhancedArticles } from '@/components/admin/articles/enhanced-articles/useEnhancedArticles'

export default function ArticlesAdmin() {
  const {
    articles,
    filteredArticles,
    loading,
    selectedStatus,
    setSelectedStatus,
    handleView,
    handleEdit,
    handleDelete
  } = useEnhancedArticles()

  if (loading) {
    return <LoadingState />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedPageHeader />

      <div className="container mx-auto px-4 py-8">
        <EnhancedArticleStats articles={articles} />

        <ArticleFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          articleCount={filteredArticles.length}
        />

        {filteredArticles.length > 0 ? (
          <ArticlesList
            articles={filteredArticles}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState selectedStatus={selectedStatus} />
        )}
      </div>
    </div>
  )
}

import { type EnhancedArticle } from '@/components/admin/articles/enhanced-articles/EnhancedArticleCard'

function ArticlesList({
  articles,
  onView,
  onEdit,
  onDelete
}: {
  readonly articles: EnhancedArticle[]
  readonly onView: (id: number) => void
  readonly onEdit: (id: number) => void
  readonly onDelete: (id: number) => void
}) {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <EnhancedArticleCard
          key={article.id}
          article={article}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
