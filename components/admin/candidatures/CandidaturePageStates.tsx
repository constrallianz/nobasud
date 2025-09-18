import { DocumentTextIcon } from '@heroicons/react/24/outline'

interface StatusOption {
  value: string
  label: string
  count: number
}

interface CandidaturePageStatesProps {
  isEmpty: boolean
  selectedStatus: string
  statusOptions: StatusOption[]
}

export function CandidaturePageStates({ 
  isEmpty, 
  selectedStatus, 
  statusOptions 
}: CandidaturePageStatesProps) {
  if (!isEmpty) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <CandidatureEmptyState 
        selectedStatus={selectedStatus}
        statusOptions={statusOptions}
      />
    </div>
  )
}

function CandidatureEmptyState({ 
  selectedStatus, 
  statusOptions 
}: { 
  readonly selectedStatus: string
  readonly statusOptions: StatusOption[]
}) {
  const isFilteredView = selectedStatus !== 'all'
  const selectedStatusLabel = statusOptions.find(s => s.value === selectedStatus)?.label

  return (
    <div className="text-center py-12">
      <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Aucune candidature trouvée
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {isFilteredView 
          ? `Aucune candidature avec le statut "${selectedStatusLabel}" trouvée.`
          : "Aucune candidature n'a été reçue pour le moment."
        }
      </p>
    </div>
  )
}