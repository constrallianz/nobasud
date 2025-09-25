import { 
  EyeIcon, 
  TrashIcon,
  CalendarIcon,
  UserIcon,
  EnvelopeIcon,
  DocumentIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Application {
  id: string
  name: string
  email: string
  message: string | null
  cvUrl: string
  coverLetterUrl: string | null
  createdAt: string
  status: 'nouveau' | 'vu' | 'en_cours' | 'retenu' | 'refuse'
}

interface CandidatureCardProps {
  candidature: Application
  onViewCV: (candidature: Application) => void
  onDelete: (candidature: Application) => void
  onUpdateStatus?: (applicationId: string, newStatus: string) => void
}

// Utility functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'nouveau': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case 'vu': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    case 'en_cours': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    case 'retenu': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case 'refuse': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'nouveau': return 'Nouveau'
    case 'vu': return 'Vu'
    case 'en_cours': return 'En cours'
    case 'retenu': return 'Retenu'
    case 'refuse': return 'Refusé'
    default: return status
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function CandidatureCard({ candidature, onViewCV, onDelete, onUpdateStatus }: CandidatureCardProps) {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {candidature.name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <CandidatureDate date={candidature.createdAt} />
              <CandidatureEmail email={candidature.email} />
              <CandidatureStatus 
                status={candidature.status}
                onUpdateStatus={onUpdateStatus ? (newStatus) => onUpdateStatus(candidature.id, newStatus) : undefined}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              {candidature.cvUrl && (
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
                  <DocumentIcon className="w-4 h-4" />
                  <span>CV</span>
                </div>
              )}
              {candidature.coverLetterUrl && (
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
                  <DocumentIcon className="w-4 h-4" />
                  <span>Lettre de motivation</span>
                </div>
              )}
            </div>

            {candidature.message && (
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMessage(!showMessage)}
                  className="p-0 h-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <ChatBubbleBottomCenterTextIcon className="w-4 h-4 mr-1" />
                  {showMessage ? 'Masquer le message' : 'Voir le message'}
                </Button>
                {showMessage && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {candidature.message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <CandidatureActions 
          candidature={candidature}
          onViewCV={onViewCV}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

function CandidatureDate({ date }: { readonly date: string }) {
  return (
    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
      <CalendarIcon className="w-4 h-4" />
      <span className="text-sm">{formatDate(date)}</span>
    </div>
  )
}

function CandidatureEmail({ email }: { readonly email: string }) {
  return (
    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
      <EnvelopeIcon className="w-4 h-4" />
      <span className="text-sm">{email}</span>
    </div>
  )
}

function CandidatureStatus({ 
  status, 
  onUpdateStatus 
}: { 
  readonly status: string
  readonly onUpdateStatus?: (newStatus: string) => void
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  const statusOptions = [
    { value: 'nouveau', label: 'Nouveau' },
    { value: 'vu', label: 'Vu' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'retenu', label: 'Retenu' },
    { value: 'refuse', label: 'Refusé' }
  ]

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus !== status && onUpdateStatus) {
      setIsUpdating(true)
      await onUpdateStatus(newStatus)
      setIsUpdating(false)
    }
  }

  if (onUpdateStatus) {
    return (
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isUpdating}
        className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${getStatusColor(status)} ${isUpdating ? 'opacity-50' : ''}`}
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  )
}

function CandidatureActions({ 
  candidature, 
  onViewCV, 
  onDelete 
}: { 
  readonly candidature: Application
  readonly onViewCV: (candidature: Application) => void
  readonly onDelete: (candidature: Application) => void
}) {
  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={() => onViewCV(candidature)}
      >
        <EyeIcon className="w-4 h-4" />
        <span>CV</span>
      </Button>
      {candidature.coverLetterUrl && (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-1"
          onClick={() => window.open(candidature.coverLetterUrl!, '_blank')}
        >
          <DocumentIcon className="w-4 h-4" />
          <span>Lettre</span>
        </Button>
      )}
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        onClick={() => onDelete(candidature)}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}