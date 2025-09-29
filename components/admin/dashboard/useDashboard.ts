import { useState, useEffect } from 'react'

interface Stats {
  projects: number
  articles: number
  jobs: number
  applications: number
  feedbacks: number
  messages: number
}

interface DashboardData {
  stats: Stats
  loading: boolean
  error: string | null
}

export default function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    stats: {
      projects: 0,
      articles: 0,
      jobs: 0,
      applications: 0,
      feedbacks: 0,
      messages: 0
    },
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }))
        
        const response = await fetch('/api/admin/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.success) {
          setData({
            stats: result.stats,
            loading: false,
            error: null
          })
        } else {
          throw new Error(result.error || 'Failed to fetch dashboard data')
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        }))
      }
    }

    fetchDashboardData()
  }, [])

  const refreshData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache busting to ensure fresh data
        cache: 'no-cache'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        setData({
          stats: result.stats,
          loading: false,
          error: null
        })
      } else {
        throw new Error(result.error || 'Failed to refresh dashboard data')
      }
    } catch (error) {
      console.error('Error refreshing dashboard data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh data'
      }))
    }
  }

  return {
    ...data,
    refreshData
  }
}