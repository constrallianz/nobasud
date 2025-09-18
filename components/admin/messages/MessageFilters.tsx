import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Message {
  status: 'nouveau' | 'lu' | 'traite' | 'archive'
}

interface MessageFiltersProps {
  messages: Message[]
  selectedStatus: string
  selectedPriority: string
  searchTerm: string
  onStatusChange: (status: string) => void
  onPriorityChange: (priority: string) => void
  onSearchChange: (search: string) => void
}

export default function MessageFilters({
  messages,
  selectedStatus,
  selectedPriority,
  searchTerm,
  onStatusChange,
  onPriorityChange,
  onSearchChange
}: MessageFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'Tous les messages', count: messages.length },
    { value: 'nouveau', label: 'Nouveaux', count: messages.filter(m => m.status === 'nouveau').length },
    { value: 'lu', label: 'Lus', count: messages.filter(m => m.status === 'lu').length },
    { value: 'traite', label: 'Traités', count: messages.filter(m => m.status === 'traite').length },
    { value: 'archive', label: 'Archivés', count: messages.filter(m => m.status === 'archive').length }
  ]

  const priorityOptions = [
    { value: 'all', label: 'Toutes priorités' },
    { value: 'urgente', label: 'Urgente' },
    { value: 'haute', label: 'Haute' },
    { value: 'normale', label: 'Normale' },
    { value: 'faible', label: 'Faible' }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.count})
              </option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou sujet..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent w-80"
          />
        </div>
      </div>
    </div>
  )
}