import { 
  EnvelopeIcon,
  EyeIcon, 
  TrashIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  submittedAt: string
  status: 'nouveau' | 'lu' | 'traite' | 'archive'
  priority: 'faible' | 'normale' | 'haute' | 'urgente'
  source: 'contact' | 'devis' | 'carriere' | 'autre'
}

interface MessageCardProps {
  message: Message
  onMarkAsRead?: (id: string) => void
  onViewDetails?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function MessageCard({ 
  message,
  onMarkAsRead,
  onViewDetails,
  onDelete
}: MessageCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800'
      case 'lu': return 'bg-yellow-100 text-yellow-800'
      case 'traite': return 'bg-green-100 text-green-800'
      case 'archive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'bg-red-100 text-red-800'
      case 'haute': return 'bg-orange-100 text-orange-800'
      case 'normale': return 'bg-blue-100 text-blue-800'
      case 'faible': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nouveau': return 'Nouveau'
      case 'lu': return 'Lu'
      case 'traite': return 'Traité'
      case 'archive': return 'Archivé'
      default: return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'Urgente'
      case 'haute': return 'Haute'
      case 'normale': return 'Normale'
      case 'faible': return 'Faible'
      default: return priority
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'contact': return 'Contact'
      case 'devis': return 'Demande devis'
      case 'carriere': return 'Carrière'
      case 'autre': return 'Autre'
      default: return source
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <li className="p-6 hover:bg-gray-50 transition-colors">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(message.status)}`}>
                  {getStatusLabel(message.status)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(message.priority)}`}>
                  {getPriorityLabel(message.priority)}
                </span>
                {message.priority === 'urgente' && (
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-gray-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span className="text-sm">{message.email}</span>
                </div>
                {message.phone && (
                  <div className="flex items-center space-x-1 text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span className="text-sm">{message.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">{formatDate(message.submittedAt)}</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {getSourceLabel(message.source)}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mt-2">{message.subject}</h4>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {message.status === 'nouveau' && onMarkAsRead && (
              <Button 
                size="sm" 
                className="flex items-center space-x-1"
                onClick={() => onMarkAsRead(message.id)}
              >
                <CheckIcon className="w-4 h-4" />
                <span>Marquer lu</span>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={() => onViewDetails?.(message.id)}
            >
              <EyeIcon className="w-4 h-4" />
              <span>Détails</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-red-700"
              onClick={() => onDelete?.(message.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="ml-16">
          <p className="text-gray-700 leading-relaxed">
            {message.message.length > 200 
              ? `${message.message.substring(0, 200)}...`
              : message.message
            }
          </p>
        </div>
      </div>
    </li>
  )
}