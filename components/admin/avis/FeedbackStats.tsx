import { 
  ChatBubbleBottomCenterTextIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import { type Feedback } from '@/lib/validations'

interface FeedbackStatsProps {
  feedbacks: Feedback[]
}

export default function FeedbackStats({ feedbacks }: FeedbackStatsProps) {
  const stats = calculateStats(feedbacks)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        label="Total"
        value={stats.total}
        bgColor="bg-blue-100 dark:bg-blue-900"
      />
      <StatCard
        icon={<CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />}
        label="Publiés"
        value={stats.published}
        bgColor="bg-green-100 dark:bg-green-900"
      />
      <StatCard
        icon={<ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
        label="Brouillons"
        value={stats.drafts}
        bgColor="bg-yellow-100 dark:bg-yellow-900"
      />
      <StatCard
        icon={<PhotoIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        label="Avec image"
        value={stats.withImage}
        bgColor="bg-purple-100 dark:bg-purple-900"
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
  value: number
  bgColor: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}

function calculateStats(feedbacks: Feedback[]) {
  return {
    total: feedbacks.length,
    published: feedbacks.filter(f => f.published).length,
    drafts: feedbacks.filter(f => !f.published).length,
    withImage: feedbacks.filter(f => f.photoUrl).length
  }
}