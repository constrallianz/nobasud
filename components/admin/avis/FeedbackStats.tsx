import { 
  ChatBubbleBottomCenterTextIcon, 
  UserIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline'
import { type Feedback } from './FeedbackCard'

interface FeedbackStatsProps {
  feedbacks: Feedback[]
}

export default function FeedbackStats({ feedbacks }: FeedbackStatsProps) {
  const stats = calculateStats(feedbacks)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        icon={<ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-blue-600" />}
        label="Total des avis"
        value={stats.total}
      />
      <StatCard
        icon={<UserIcon className="w-8 h-8 text-green-600" />}
        label="Avis identifiés"
        value={stats.identified}
      />
      <StatCard
        icon={<UserIcon className="w-8 h-8 text-yellow-600" />}
        label="Avis anonymes"
        value={stats.anonymous}
      />
      <StatCard
        icon={<CalendarIcon className="w-8 h-8 text-purple-600" />}
        label="Ce mois-ci"
        value={stats.thisMonth}
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function calculateStats(feedbacks: Feedback[]) {
  const now = new Date()
  
  return {
    total: feedbacks.length,
    identified: feedbacks.filter(f => !f.anonymous).length,
    anonymous: feedbacks.filter(f => f.anonymous).length,
    thisMonth: feedbacks.filter(f => {
      const feedbackDate = new Date(f.createdAt)
      return feedbackDate.getMonth() === now.getMonth() && 
             feedbackDate.getFullYear() === now.getFullYear()
    }).length
  }
}