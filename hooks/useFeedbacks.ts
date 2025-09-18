import { useState, useEffect, useMemo } from 'react'
import { type Feedback } from '@/components/admin/avis/FeedbackCard'

// Hook for fetching feedbacks from the API
export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const deleteFeedback = async (id: string) => {
    const response = await fetch(`/api/admin/feedback?id=${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete feedback')
    }

    // Remove from local state
    setFeedbacks(prev => prev.filter(f => f.id !== id))
  }

  return {
    feedbacks,
    loading,
    error,
    deleteFeedback,
    refetch: fetchFeedbacks
  }
}

// Hook for filtering feedbacks
export function useFeedbackFilters(feedbacks: Feedback[]) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZone, setSelectedZone] = useState('all')

  // Calculate zone counts and options
  const zoneOptions = useMemo(() => {
    const zoneCounts: Record<string, number> = feedbacks.reduce((acc, feedback) => {
      const zone = feedback.zone || 'Aucune zone'
      acc[zone] = (acc[zone] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return [
      { value: 'all', label: 'Toutes les zones', count: feedbacks.length },
      ...Object.entries(zoneCounts).map(([zone, count]) => ({
        value: zone,
        label: zone === 'Aucune zone' ? 'Sans zone' : zone,
        count
      }))
    ]
  }, [feedbacks])

  // Filter feedbacks based on search term and zone
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

  return {
    searchTerm,
    setSearchTerm,
    selectedZone,
    setSelectedZone,
    zoneOptions,
    filteredFeedbacks
  }
}