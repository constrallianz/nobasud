import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  slug: string
  type: string | null
  location: string | null
  description: string | null
  images: string | null
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          console.error('API returned non-array data:', data)
          setProjects([])
        }
      } else {
        console.error('Failed to fetch projects, status:', response.status)
        setProjects([])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleView = (projectId: string) => {
    console.log('Viewing project:', projectId)
  }

  const handleEdit = (projectId: string) => {
    router.push(`/admin/projects/edit/${projectId}`)
  }

  const fetchProjectById = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`)
      if (!response.ok) {
        throw new Error('Projet non trouvé')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  }

  const updateProject = async (id: string, data: FormData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        body: data,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erreur lors de la mise à jour du projet')
      }

      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }
    }
  }

  const createProject = async (data: FormData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        body: data,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erreur lors de la création du projet')
      }

      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }
    }
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Remove the project from the local state
        setProjects(prev => prev.filter(project => project.id !== projectId))
        alert('Projet supprimé avec succès')
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Erreur lors de la suppression du projet')
    }
  }

  return {
    projects,
    loading,
    fetchProjects,
    fetchProjectById,
    updateProject,
    createProject,
    handleView,
    handleEdit,
    handleDelete
  }
}