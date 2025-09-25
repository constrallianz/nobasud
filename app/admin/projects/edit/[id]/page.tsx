'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProjectFormPageHeader from '@/components/admin/projects/shared/ProjectFormPageHeader'
import ProjectFormContainer from '@/components/admin/projects/shared/ProjectFormContainer'
import LoadingState from '@/components/admin/projects/states/LoadingState'
import ErrorState from '@/components/admin/projects/states/ErrorState'
import { type Project } from '@/lib/validations'

interface EditProjectPageProps {
  params: { id: string }
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/projects/${params.id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch project')
      }

      const projectData = await response.json()
      
      // Parse images if they're stored as JSON string
      if (projectData.images && typeof projectData.images === 'string') {
        try {
          projectData.images = JSON.parse(projectData.images)
        } catch {
          projectData.images = []
        }
      }
      
      setProject(projectData)
    } catch (error) {
      console.error('Error fetching project:', error)
      setError('Erreur lors du chargement du projet')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & { imageFiles?: File[] }) => {
    setIsSubmitting(true)
    
    try {
      const form = new FormData()
      form.append('name', data.name || '')
      form.append('slug', data.slug || '')
      form.append('type', data.type || '')
      form.append('location', data.location || '')
      form.append('description', data.description || '')
      
      // Add existing image URLs (from URL input and existing project images)
      const existingImages = data.images?.filter(img => !img.startsWith('blob:')) || []
      form.append('images', JSON.stringify(existingImages))
      
      // Add new files
      if (data.imageFiles && data.imageFiles.length > 0) {
        data.imageFiles.forEach(file => {
          form.append('imageFiles', file)
        })
      }

      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PUT',
        body: form, // Use FormData instead of JSON
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      router.push('/admin/projects')
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Erreur lors de la mise à jour du projet')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <LoadingState message="Chargement du projet..." />
  }

  if (error || !project) {
    return <ErrorState error={error || 'Projet non trouvé'} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectFormPageHeader title={`Modifier le projet: ${project.name}`} />
      <ProjectFormContainer
        initialData={project}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Mettre à jour le projet"
      />
    </div>
  )
}