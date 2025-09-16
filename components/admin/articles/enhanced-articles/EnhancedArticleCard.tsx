import { Button } from '@/components/ui/button'
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'

export interface EnhancedArticle {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  status: 'draft' | 'published' | 'archived'
  category: string
  featuredImage: string
  views: number
  comments: number
}

interface EnhancedArticleCardProps {
  article: EnhancedArticle
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function EnhancedArticleCard({ 
  article, 
  onView, 
  onEdit, 
  onDelete 
}: EnhancedArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="flex">
        <ArticleImage 
          src={article.featuredImage} 
          alt={article.title} 
        />
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between">
            <ArticleContent article={article} />
            <ArticleActions 
              article={article}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-48 h-32 flex-shrink-0">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function ArticleContent({ article }: { article: EnhancedArticle }) {
  return (
    <div className="flex-1">
      <ArticleHeader article={article} />
      <ArticleExcerpt excerpt={article.excerpt} />
      <ArticleMeta article={article} />
      <ArticleCategory category={article.category} />
    </div>
  )
}

function ArticleHeader({ article }: { article: EnhancedArticle }) {
  return (
    <div className="flex items-center space-x-3 mb-2">
      <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
      <ArticleStatusBadge status={article.status} />
    </div>
  )
}

function ArticleStatusBadge({ status }: { status: EnhancedArticle['status'] }) {
  const getBadgeConfig = (status: string) => {
    switch (status) {
      case 'published':
        return {
          icon: EyeIcon,
          label: 'Publié',
          className: 'bg-green-100 text-green-800'
        }
      case 'draft':
        return {
          icon: PencilIcon,
          label: 'Brouillon',
          className: 'bg-yellow-100 text-yellow-800'
        }
      case 'archived':
        return {
          icon: EyeSlashIcon,
          label: 'Archivé',
          className: 'bg-gray-100 text-gray-800'
        }
      default:
        return null
    }
  }

  const config = getBadgeConfig(status)
  if (!config) return null

  const IconComponent = config.icon

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  )
}

function ArticleExcerpt({ excerpt }: { excerpt: string }) {
  return (
    <p className="text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
  )
}

function ArticleMeta({ article }: { article: EnhancedArticle }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  return (
    <div className="flex items-center space-x-6 text-sm text-gray-500">
      <MetaItem icon={UserIcon} text={article.author} />
      <MetaItem icon={CalendarIcon} text={formatDate(article.publishedAt)} />
      <MetaItem icon={EyeIcon} text={`${article.views.toLocaleString()} vues`} />
      <MetaItem icon={ChatBubbleLeftIcon} text={`${article.comments} commentaires`} />
    </div>
  )
}

function MetaItem({ 
  icon: Icon, 
  text 
}: { 
  icon: React.ComponentType<{ className?: string }>
  text: string 
}) {
  return (
    <div className="flex items-center">
      <Icon className="w-4 h-4 mr-1" />
      {text}
    </div>
  )
}

function ArticleCategory({ category }: { category: string }) {
  return (
    <div className="mt-2">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {category}
      </span>
    </div>
  )
}

function ArticleActions({ 
  article,
  onView, 
  onEdit, 
  onDelete 
}: {
  article: EnhancedArticle
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}) {
  return (
    <div className="flex items-center space-x-2 ml-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={() => onView?.(article.id)}
      >
        <EyeIcon className="w-4 h-4" />
        <span>Voir</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={() => onEdit?.(article.id)}
      >
        <PencilIcon className="w-4 h-4" />
        <span>Modifier</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1 text-red-600 hover:text-red-700"
        onClick={() => onDelete?.(article.id)}
      >
        <TrashIcon className="w-4 h-4" />
        <span>Supprimer</span>
      </Button>
    </div>
  )
}