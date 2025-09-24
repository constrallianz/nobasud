'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ThemeToggle from '@/components/ThemeToggle'
import FeedbackFilters from '@/components/admin/avis/FeedbackFilters'
import FeedbackStats from '@/components/admin/avis/FeedbackStats'
import FeedbackPageStates from '@/components/admin/avis/FeedbackPageStates'
import { type Feedback } from '@/lib/validations'

interface ZoneOption {
  value: string
  label: string
  count: number
}

export default function AdminAvisPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZone, setSelectedZone] = useState('all')

  const zoneOptions: ZoneOption[] = [
    { value: 'all', label: 'Toutes les zones', count: feedbacks.length },
    ...Array.from(new Set(feedbacks.map(f => f.project).filter(Boolean))).map(project => ({
      value: project!,
      label: project!,
      count: feedbacks.filter(f => f.project === project).length
    }))
  ]

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/api/admin/feedbacks')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des avis')
        }
        const data = await response.json()
        setFeedbacks(data || [])
      } catch (err) {
        console.error('Error fetching feedbacks:', err)
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  useEffect(() => {
    let filtered = feedbacks.filter(feedback =>
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.project?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (feedback.company && feedback.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (selectedZone !== 'all') {
      filtered = filtered.filter(f => f.project === selectedZone)
    }

    setFilteredFeedbacks(filtered)
  }, [feedbacks, searchTerm, selectedZone])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/feedbacks/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      setFeedbacks(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      console.error('Error deleting feedback:', err)
      throw err
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement des avis...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Erreur de chargement</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header matching other admin pages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Avis</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {filteredFeedbacks.length} avis {searchTerm && `sur ${feedbacks.length}`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/admin/avis/new">
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    Nouvel Avis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <FeedbackStats feedbacks={feedbacks} />

        <FeedbackFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedZone={selectedZone}
          onZoneChange={setSelectedZone}
          zoneOptions={zoneOptions}
        />

        {filteredFeedbacks.length > 0 ? (
          <FeedbackPageStates 
            feedbacks={filteredFeedbacks}
            onDelete={handleDelete}
          />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucun avis trouvé
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {selectedZone === 'all' 
                  ? "Aucun avis n'a été soumis pour le moment."
                  : `Aucun avis trouvé pour la zone "${zoneOptions.find(z => z.value === selectedZone)?.label}".`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
