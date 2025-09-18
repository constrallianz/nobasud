import { EnvelopeIcon } from '@heroicons/react/24/outline'

interface EmptyStateProps {
  selectedStatus: string
  statusOptions: { value: string; label: string }[]
}

export default function MessagePageStates({ selectedStatus, statusOptions }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <EnvelopeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message trouvé</h3>
      <p className="text-gray-600">
        {selectedStatus === 'all' 
          ? "Aucun message n'a été reçu pour le moment."
          : `Aucun message avec le statut "${statusOptions.find(s => s.value === selectedStatus)?.label}" trouvé.`
        }
      </p>
    </div>
  )
}