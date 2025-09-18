import AuthGuard from '@/components/AuthGuard'
import { BriefcaseIcon } from '@heroicons/react/24/outline'

export function LoadingState() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des offres d'emploi...</p>
        </div>
      </div>
    </AuthGuard>
  )
}

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Aucune offre d'emploi
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Commencez par créer votre première offre d'emploi.
      </p>
    </div>
  )
}

interface JobsListProps {
  children: React.ReactNode
}

export function JobsList({ children }: JobsListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Toutes les offres d'emploi</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </div>
    </div>
  )
}