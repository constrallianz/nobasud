import { EnvelopeIcon } from '@heroicons/react/24/outline'

interface Message {
  status: 'nouveau' | 'lu' | 'traite' | 'archive'
}

interface MessageStatsProps {
  messages: Message[]
}

export default function MessageStats({ messages }: MessageStatsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800'
      case 'lu': return 'bg-yellow-100 text-yellow-800'
      case 'traite': return 'bg-green-100 text-green-800'
      case 'archive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const statusOptions = [
    { value: 'nouveau', label: 'Nouveaux', count: messages.filter(m => m.status === 'nouveau').length },
    { value: 'lu', label: 'Lus', count: messages.filter(m => m.status === 'lu').length },
    { value: 'traite', label: 'Traités', count: messages.filter(m => m.status === 'traite').length },
    { value: 'archive', label: 'Archivés', count: messages.filter(m => m.status === 'archive').length }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statusOptions.map((status) => (
        <div key={status.value} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{status.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{status.count}</p>
            </div>
            <div className={`p-3 rounded-lg ${getStatusColor(status.value)}`}>
              <EnvelopeIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}