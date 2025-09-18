import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'

export interface Article {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  coverImageUrl: string | null
  tags: string | null
  publishedAt: Date | null
  published: boolean
}

interface ArticleCardProps {
  article: Article
  onDelete: (id: string) => void
  onEdit?: (id: string) => void
  onView?: (id: string) => void
}

export default function ArticleCard({ article, onDelete, onEdit, onView }: ArticleCardProps) {
  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      onDelete(article.id)
    }
  }

  return (
    <div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <ArticleHeader article={article} />
          <ArticleExcerpt article={article} />
          <ArticleMeta article={article} />
        </div>
        
        <ArticleActions 
          onView={() => onView?.(article.id)}
          onEdit={() => onEdit?.(article.id)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

function ArticleHeader({ article }: { article: Article }) {
  return (
    <div className="flex items-center space-x-3 mb-2">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {article.title}
      </h3>
      <ArticleStatusBadge published={article.published} />
    </div>
  )
}

function ArticleStatusBadge({ published }: { published: boolean }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      published 
        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
    }`}>
      {published ? 'Publié' : 'Brouillon'}
    </span>
  )
}

function ArticleExcerpt({ article }: { article: Article }) {
  if (!article.excerpt) return null
  
  return (
    <p className="text-gray-600 dark:text-gray-400 mb-2">
      {article.excerpt}
    </p>
  )
}

function ArticleMeta({ article }: { article: Article }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR')
  }

  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
      {article.tags && (
        <>
          <span>Tags: {article.tags}</span>
          <span>•</span>
        </>
      )}
      <span>Créé le {formatDate(article.createdAt)}</span>
      <span>•</span>
      <span>Modifié le {formatDate(article.updatedAt)}</span>
    </div>
  )
}

function ArticleActions({ 
  onView, 
  onEdit, 
  onDelete 
}: {
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={onView}
      >
        <EyeIcon className="w-4 h-4" />
        <span>Voir</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={onEdit}
      >
        <PencilIcon className="w-4 h-4" />
        <span>Modifier</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onDelete}
        className="flex items-center space-x-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
      >
        <TrashIcon className="w-4 h-4" />
        <span>Supprimer</span>
      </Button>
    </div>
  )
}