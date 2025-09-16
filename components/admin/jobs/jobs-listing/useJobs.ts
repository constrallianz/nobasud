import { useState, useEffect } from 'react'

interface Job {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  slug: string
  department: string | null
  location: string | null
  description: string | null
  published: boolean
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/admin/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      } else {
        setError('Erreur lors du chargement des offres d\'emploi')
        console.error('Failed to fetch jobs')
      }
    } catch (error) {
      setError('Erreur de connexion au serveur')
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (job: Job) => {
    // In a real app, this would navigate to job detail view
    console.log('Viewing job:', job.title)
    // window.open(`/admin/jobs/${job.id}`, '_blank')
  }

  const handleEdit = (job: Job) => {
    // In a real app, this would navigate to job edit form
    console.log('Editing job:', job.title)
    // window.location.href = `/admin/jobs/${job.id}/edit`
  }

  const handleDelete = (job: Job) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'offre "${job.title}" ?`)) {
      deleteJob(job.id)
    }
  }

  const deleteJob = async (jobId: string) => {
    try {
      // In a real app, this would call an API to delete the job
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId))
      console.log('Job deleted:', jobId)
      
      // Simulate API call
      // const response = await fetch(`/api/admin/jobs/${jobId}`, { method: 'DELETE' })
      // if (!response.ok) {
      //   throw new Error('Failed to delete job')
      // }
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Erreur lors de la suppression de l\'offre')
    }
  }

  const refreshJobs = () => {
    fetchJobs()
  }

  return {
    jobs,
    loading,
    error,
    handleView,
    handleEdit,
    handleDelete,
    refreshJobs
  }
}