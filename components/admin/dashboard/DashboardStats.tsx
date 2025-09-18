import { 
  ChartBarIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  DocumentIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface Stats {
  projects: number
  articles: number
  jobs: number
  applications: number
  feedbacks: number
  messages: number
}

interface DashboardStatsProps {
  stats: Stats
  loading?: boolean
  variant?: 'default' | 'new' | 'new-2'
}

export default function DashboardStats({ stats, loading = false, variant = 'default' }: DashboardStatsProps) {
  if (variant === 'new' || variant === 'new-2') {
    // Layout for page-new.tsx and page-new-2.tsx
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Vue d&apos;ensemble</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Projets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.projects}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <DocumentTextIcon className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Articles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.articles}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <BriefcaseIcon className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Emplois</p>
                <p className="text-2xl font-bold text-gray-900">{stats.jobs}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <UserGroupIcon className="w-8 h-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">CV reçus</p>
                <p className="text-2xl font-bold text-gray-900">{stats.applications}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-pink-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avis</p>
                <p className="text-2xl font-bold text-gray-900">{stats.feedbacks}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <EnvelopeIcon className="w-8 h-8 text-indigo-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.messages}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default layout for main page.tsx
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Vue d'ensemble</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projets</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {loading ? '...' : stats.projects}
              </p>
            </div>
            <BuildingOffice2Icon className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Articles</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {loading ? '...' : stats.articles}
              </p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Emplois</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {loading ? '...' : stats.jobs}
              </p>
            </div>
            <BriefcaseIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">CV reçus</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {loading ? '...' : stats.applications}
              </p>
            </div>
            <DocumentIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avis</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {loading ? '...' : stats.feedbacks}
              </p>
            </div>
            <StarIcon className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Messages</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {loading ? '...' : stats.messages}
              </p>
            </div>
            <EnvelopeIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  )
}