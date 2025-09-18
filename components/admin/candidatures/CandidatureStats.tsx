import { DocumentTextIcon } from '@heroicons/react/24/outline'

interface StatusOption {
  value: string
  label: string
  count: number
}

interface CandidatureStatsProps {
  statusOptions: StatusOption[]
}

export function CandidatureStats({ statusOptions }: CandidatureStatsProps) {
  // Skip the 'all' option for the stats display
  const statsOptions = statusOptions.slice(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {statsOptions.map((status) => (
        <CandidatureStatCard key={status.value} status={status} />
      ))}
    </div>
  )
}

function CandidatureStatCard({ status }: { readonly status: StatusOption }) {
  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'nouveau': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'vu': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      case 'en_cours': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'retenu': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'refuse': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {status.label}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {status.count}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${getStatusColor(status.value)}`}>
          <DocumentTextIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}