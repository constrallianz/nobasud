import { DocumentTextIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
import { type Article } from './ArticleCard'

interface ArticleStatsProps {
  articles: Article[]
}

export default function ArticleStats({ articles }: ArticleStatsProps) {
  const stats = calculateStats(articles)

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={<DocumentTextIcon className="w-8 h-8 text-blue-500" />}
        label="Total"
        value={stats.total}
      />
      <StatCard
        icon={<EyeIcon className="w-8 h-8 text-green-500" />}
        label="Publiés"
        value={stats.published}
      />
      <StatCard
        icon={<PencilIcon className="w-8 h-8 text-orange-500" />}
        label="Brouillons"
        value={stats.drafts}
      />
    </div>
  )
}

function StatCard({
  icon,
  label,
  value
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  )
}

function calculateStats(articles: Article[]) {
  return {
    total: articles.length,
    published: articles.filter(a => a.published).length,
    drafts: articles.filter(a => !a.published).length
  }
}