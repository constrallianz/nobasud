import { useState, useMemo, useEffect } from 'react'

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

interface StatusOption {
  value: string
  label: string
  count: number
}

export function useCandidatures() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch applications from API
  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch('/api/admin/applications')
        if (response.ok) {
          const data = await response.json()
          setApplications(data)
        } else {
          console.error('Failed to fetch applications')
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const statusOptions: StatusOption[] = useMemo(() => [
    { value: 'all', label: 'Tous les statuts', count: applications.length },
    { value: 'nouveau', label: 'Nouveau', count: applications.filter(c => c.status === 'nouveau').length },
    { value: 'vu', label: 'Vu', count: applications.filter(c => c.status === 'vu').length },
    { value: 'en_cours', label: 'En cours', count: applications.filter(c => c.status === 'en_cours').length },
    { value: 'retenu', label: 'Retenu', count: applications.filter(c => c.status === 'retenu').length },
    { value: 'refuse', label: 'Refusé', count: applications.filter(c => c.status === 'refuse').length }
  ], [applications])

  const filteredCandidatures = useMemo(() => {
    return applications.filter(application => {
      const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus
      const matchesSearch = application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           application.email.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [applications, selectedStatus, searchTerm])

  const handleViewCV = (application: Application) => {
    // Open CV in new tab
    if (application.cvUrl) {
      window.open(application.cvUrl, '_blank')
    }
  }

  const handleUpdateStatus = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: applicationId, status: newStatus }),
      })

      if (response.ok) {
        const updatedApplication = await response.json()
        setApplications(prev => 
          prev.map(app => 
            app.id === applicationId 
              ? { ...app, status: updatedApplication.status }
              : app
          )
        )
      } else {
        console.error('Failed to update application status')
      }
    } catch (error) {
      console.error('Error updating application status:', error)
    }
  }

  const handleDelete = async (application: Application) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la candidature de ${application.name} ?`)) {
      try {
        const response = await fetch(`/api/admin/applications?id=${application.id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setApplications(prev => prev.filter(app => app.id !== application.id))
        } else {
          console.error('Failed to delete application')
          alert('Erreur lors de la suppression')
        }
      } catch (error) {
        console.error('Error deleting application:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  return {
    candidatures: applications,
    filteredCandidatures,
    loading,
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    statusOptions,
    handleViewCV,
    handleUpdateStatus,
    handleDelete
  }
}