import { 
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import type { Article } from '@/lib/validations'

interface ArticleStatsProps {
  readonly articles: Article[]
}

export default function ArticleStats({ articles }: ArticleStatsProps) {
  const totalArticles = articles.length
  const publishedArticles = articles.filter(a => a.published).length
  const draftArticles = articles.filter(a => !a.published).length
  
  // Count articles with tags (handle both string and array formats)
  const articlesWithTags = articles.filter(a => {
    if (!a.tags) return false
    if (typeof a.tags === 'string') {
      try {
        const parsed = JSON.parse(a.tags)
        return Array.isArray(parsed) && parsed.length > 0
      } catch {
        return false
      }
    }
    return Array.isArray(a.tags) && a.tags.length > 0
  }).length

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <ArticleStatCard
        title="Total"
        value={totalArticles}
        icon={<DocumentTextIcon className="w-8 h-8 text-blue-500" />}
      />
      <ArticleStatCard
        title="Publiés"
        value={publishedArticles}
        icon={<EyeIcon className="w-8 h-8 text-green-500" />}
      />
      <ArticleStatCard
        title="Brouillons"
        value={draftArticles}
        icon={<PencilIcon className="w-8 h-8 text-orange-500" />}
      />
      <ArticleStatCard
        title="Avec tags"
        value={articlesWithTags}
        icon={<TagIcon className="w-8 h-8 text-purple-500" />}
      />
    </div>
  )
}

function ArticleStatCard({ 
  title, 
  value, 
  icon 
}: { 
  readonly title: string
  readonly value: number
  readonly icon: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  )
}