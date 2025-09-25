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
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setData({
          stats: {
            projects: 5,
            articles: 3,
            jobs: 3,
            applications: 2,
            feedbacks: 3,
            messages: 2
          },
          loading: false,
          error: null
        })
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

  const refreshData = () => {
    // Re-trigger the useEffect by updating the state
    setData(prev => ({ ...prev, loading: true, error: null }))
    
    // Simulate loading and refresh with mock data
    setTimeout(() => {
      setData({
        stats: {
          projects: 5,
          articles: 3,
          jobs: 3,
          applications: 2,
          feedbacks: 3,
          messages: 2
        },
        loading: false,
        error: null
      })
    }, 1000)
  }

  return {
    ...data,
    refreshData
  }
}