'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  UserIcon, 
  CalendarIcon, 
  TrashIcon,
  ArrowLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

// Feedback interface matching the database model
interface Feedback {
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

export default function AdminAvisPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZone, setSelectedZone] = useState('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  // Fetch feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/admin/feedback')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch feedbacks (${response.status})`)
        }
        
        const data = await response.json()
        
        if (Array.isArray(data)) {
          setFeedbacks(data)
        } else {
          console.error('Unexpected API response format:', data)
          setError('Invalid data format received')
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err)
        setError(err instanceof Error ? err.message : 'Failed to load feedbacks')
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  // Calculate zone counts
  const zoneCounts = feedbacks.reduce((acc, feedback) => {
    const zone = feedback.zone || 'Aucune zone'
    acc[zone] = (acc[zone] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const zoneOptions = [
    { value: 'all', label: 'Toutes les zones', count: feedbacks.length },
    ...Object.entries(zoneCounts).map(([zone, count]) => ({
      value: zone,
      label: zone === 'Aucune zone' ? 'Sans zone' : zone,
      count
    }))
  ]

  // Filter and search functionality
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(feedback => {
      const feedbackZone = feedback.zone || 'Aucune zone'
      const matchesZone = selectedZone === 'all' || feedbackZone === selectedZone
      const matchesSearch = !searchTerm || 
        feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesZone && matchesSearch
    })
  }, [feedbacks, selectedZone, searchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
      return
    }

    try {
      setDeleting(id)
      const response = await fetch(`/api/admin/feedback?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete feedback')
      }

      // Remove from local state
      setFeedbacks(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      console.error('Error deleting feedback:', err)
      alert('Erreur lors de la suppression du feedback')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Retour</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Avis</h1>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des avis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Retour</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Avis</h1>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Retour</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Avis</h1>
        </div>
        <div className="text-sm text-gray-600">
          {filteredFeedbacks.length} avis 
          {searchTerm && ` (filtrés sur "${searchTerm}")`}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total des avis</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserIcon className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avis identifiés</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.filter(f => !f.anonymous).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserIcon className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avis anonymes</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.filter(f => f.anonymous).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="w-8 h-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ce mois-ci</p>
              <p className="text-2xl font-bold text-gray-900">
                {feedbacks.filter(f => {
                  const feedbackDate = new Date(f.createdAt)
                  const now = new Date()
                  return feedbackDate.getMonth() === now.getMonth() && feedbackDate.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {zoneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, sujet ou message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {filteredFeedbacks.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredFeedbacks.map((feedback) => (
              <li key={feedback.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
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
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span className="text-sm">{formatDate(feedback.createdAt)}</span>
                          </div>
                          {feedback.zone && (
                            <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {feedback.zone}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Sujet:</strong> {feedback.subject}
                        </p>
                        {!feedback.anonymous && feedback.email && (
                          <p className="text-sm text-gray-600">
                            <strong>Email:</strong> {feedback.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(feedback.id)}
                        disabled={deleting === feedback.id}
                      >
                        {deleting === feedback.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <TrashIcon className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="ml-16">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{feedback.message}</p>
                    </div>
                    {feedback.photoUrl && (
                      <div className="mt-3">
                        <img 
                          src={feedback.photoUrl} 
                          alt="Pièce jointe" 
                          className="max-w-sm rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <ChatBubbleBottomCenterTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis trouvé</h3>
            <p className="text-gray-600">
              {selectedZone === 'all' 
                ? "Aucun avis n'a été soumis pour le moment."
                : `Aucun avis trouvé pour la zone "${zoneOptions.find(z => z.value === selectedZone)?.label}".`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
