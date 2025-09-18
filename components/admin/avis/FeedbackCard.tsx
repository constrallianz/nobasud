import { useState } from 'react'
import { UserIcon, CalendarIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

export interface Feedback {
  id: string
  createdAt: string
  anonymous: boolean
  name: string
  email: string
  subject: string
  zone: string
  message: string
  photoUrl?: string
}

interface FeedbackCardProps {
  feedback: Feedback
  onDelete: (id: string) => Promise<void>
}

export default function FeedbackCard({ feedback, onDelete }: FeedbackCardProps) {
  const [deleting, setDeleting] = useState(false)



  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
      return
    }

    try {
      setDeleting(true)
      await onDelete(feedback.id)
    } catch (error) {
      console.error('Error deleting feedback:', error)
      alert('Erreur lors de la suppression du feedback')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <li className="p-6 hover:bg-gray-50 transition-colors">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <FeedbackHeader feedback={feedback} />
              <FeedbackMeta feedback={feedback} />
              <FeedbackDetails feedback={feedback} />
            </div>
          </div>
          
          <FeedbackActions 
            onDelete={handleDelete}
            deleting={deleting}
          />
        </div>
        
        <FeedbackContent feedback={feedback} />
      </div>
    </li>
  )
}

function FeedbackHeader({ feedback }: { feedback: Feedback }) {
  return (
    <div className="flex items-center space-x-3">
      <h3 className="text-lg font-semibold text-gray-900">
        {feedback.anonymous ? 'Utilisateur anonyme' : feedback.name}
      </h3>
      {feedback.anonymous && (
        <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
          Anonyme
        </span>
      )}
    </div>
  )
}

function FeedbackMeta({ feedback }: { feedback: Feedback }) {
  return (
    <div className="flex items-center space-x-4 mt-1">
      <div className="flex items-center space-x-1 text-gray-600">
        <CalendarIcon className="w-4 h-4" />
        <span className="text-sm">{new Date(feedback.createdAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</span>
      </div>
      {feedback.zone && (
        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {feedback.zone}
        </span>
      )}
    </div>
  )
}

function FeedbackDetails({ feedback }: { feedback: Feedback }) {
  return (
    <div className="mt-1 space-y-1">
      <p className="text-sm text-gray-600">
        <strong>Sujet:</strong> {feedback.subject}
      </p>
      {!feedback.anonymous && feedback.email && (
        <p className="text-sm text-gray-600">
          <strong>Email:</strong> {feedback.email}
        </p>
      )}
    </div>
  )
}

function FeedbackActions({ onDelete, deleting }: { onDelete: () => void, deleting: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600 hover:text-red-700"
        onClick={onDelete}
        disabled={deleting}
      >
        {deleting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
        ) : (
          <TrashIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}

function FeedbackContent({ feedback }: { feedback: Feedback }) {
  return (
    <div className="ml-16">
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{feedback.message}</p>
      </div>
      {feedback.photoUrl && (
        <div className="mt-3">
          <img 
            src={feedback.photoUrl} 
            alt="Fichier joint au feedback" 
            className="max-w-sm rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  )
}