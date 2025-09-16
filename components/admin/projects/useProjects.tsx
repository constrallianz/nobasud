import { useState, useEffect } from 'react'

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

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
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
    // Ici vous ajouteriez la logique pour afficher les détails du projet
  }

  const handleEdit = (projectId: string) => {
    console.log('Editing project:', projectId)
    // Ici vous ajouteriez la logique pour modifier le projet
  }

  const handleDelete = (projectId: string) => {
    console.log('Deleting project:', projectId)
    // Ici vous ajouteriez la logique pour supprimer le projet
  }

  return {
    projects,
    loading,
    fetchProjects,
    handleView,
    handleEdit,
    handleDelete
  }
}