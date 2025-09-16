import { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface Activity {
  id: number
  type: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'info'
}

interface RecentActivityProps {
  variant?: 'default' | 'new' | 'new-2'
}

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'Projet',
    description: 'Nouveau projet "Site e-commerce" ajouté',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'success'
  },
  {
    id: 2,
    type: 'Candidature',
    description: 'Nouvelle candidature reçue pour le poste "Développeur React"',
    timestamp: '2024-01-15T09:15:00Z',
    status: 'info'
  },
  {
    id: 3,
    type: 'Article',
    description: 'Article "Les tendances du web design" publié',
    timestamp: '2024-01-15T08:45:00Z',
    status: 'success'
  },
  {
    id: 4,
    type: 'Message',
    description: 'Nouveau message de contact de John Doe',
    timestamp: '2024-01-14T17:20:00Z',
    status: 'warning'
  },
  {
    id: 5,
    type: 'Témoignage',
    description: 'Nouveau témoignage en attente de modération',
    timestamp: '2024-01-14T16:10:00Z',
    status: 'warning'
  },
  {
    id: 6,
    type: 'Emploi',
    description: 'Offre "Chef de projet digital" mise à jour',
    timestamp: '2024-01-14T14:30:00Z',
    status: 'info'
  }
]

export default function RecentActivity({ variant = 'default' }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setActivities(mockActivities)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) {
      return 'Il y a moins d\'une heure'
    } else if (hours < 24) {
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
    } else {
      const days = Math.floor(hours / 24)
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'info':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const displayedActivities = expanded ? activities : activities.slice(0, 5)

  const renderSkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={`skeleton-item-${index}`} className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderEmptyState = (className: string) => (
    <div className={className}>
      Aucune activité récente
    </div>
  )

  if (variant === 'new' || variant === 'new-2') {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
          {activities.length > 5 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-brand-blue hover:text-brand-blue-dark flex items-center gap-1"
            >
              {expanded ? 'Voir moins' : 'Voir tout'}
              {expanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border">
          {loading && (
            <div className="p-6">{renderSkeletonLoader()}</div>
          )}
          
          {!loading && displayedActivities.length === 0 && (
            renderEmptyState("p-6 text-center text-gray-500")
          )}

          {!loading && displayedActivities.length > 0 && (
            <div className="divide-y divide-gray-100">
              {displayedActivities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.type.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{activity.description}</p>
                        <p className="text-xs text-gray-500">{formatTime(activity.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // Default layout for main page.tsx
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Activité récente</h2>
          {activities.length > 5 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
            >
              {expanded ? 'Voir moins' : 'Voir tout'}
              {expanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {loading && (
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={`loading-item-${index}`} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && displayedActivities.length === 0 && (
          renderEmptyState("text-center text-gray-500 dark:text-gray-400 py-8")
        )}

        {!loading && displayedActivities.length > 0 && (
          <div className="space-y-4">
            {displayedActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getStatusColor(activity.status)} dark:bg-opacity-20`}>
                  {activity.type.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100 mb-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}