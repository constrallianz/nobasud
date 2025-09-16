import { 
  EyeIcon, 
  PencilIcon, 
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline'
import { type EnhancedArticle } from './EnhancedArticleCard'

interface EnhancedArticleStatsProps {
  articles: EnhancedArticle[]
}

export default function EnhancedArticleStats({ articles }: EnhancedArticleStatsProps) {
  const stats = calculateEnhancedStats(articles)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={<EyeIcon className="w-6 h-6 text-green-600" />}
        label="Publiés"
        value={stats.published}
        bgColor="bg-green-100"
      />
      <StatCard
        icon={<PencilIcon className="w-6 h-6 text-yellow-600" />}
        label="Brouillons"
        value={stats.drafts}
        bgColor="bg-yellow-100"
      />
      <StatCard
        icon={<EyeIcon className="w-6 h-6 text-blue-600" />}
        label="Vues totales"
        value={stats.totalViews.toLocaleString()}
        bgColor="bg-blue-100"
      />
      <StatCard
        icon={<ChatBubbleLeftIcon className="w-6 h-6 text-purple-600" />}
        label="Commentaires"
        value={stats.totalComments}
        bgColor="bg-purple-100"
      />
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  bgColor
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  bgColor: string
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function calculateEnhancedStats(articles: EnhancedArticle[]) {
  return {
    published: articles.filter(a => a.status === 'published').length,
    drafts: articles.filter(a => a.status === 'draft').length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    totalComments: articles.reduce((sum, a) => sum + a.comments, 0)
  }
}