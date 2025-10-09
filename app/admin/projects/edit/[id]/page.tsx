'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProjectFormPageHeader from '@/components/admin/projects/shared/ProjectFormPageHeader'
import ProjectFormContainer from '@/components/admin/projects/shared/ProjectFormContainer'
import LoadingState from '@/components/admin/projects/states/LoadingState'
import ErrorState from '@/components/admin/projects/states/ErrorState'
import { type Project } from '@/lib/validations'
import { useProjects } from '@/components/admin/projects/listing/useProjects'

interface EditProjectPageProps {
  params: { id: string }
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { fetchProjectById, updateProject } = useProjects()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProject()
  }, [params.id])

  const loadProject = async () => {
    try {
      setIsLoading(true)
      const projectData = await fetchProjectById(params.id)
      
      if (!projectData) {
        throw new Error('Projet non trouvé')
      }
      
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
    setError(null)
    
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

      const result = await updateProject(params.id, form)

      if (result.success) {
        router.push('/admin/projects')
      } else {
        setError(result.error || 'Une erreur est survenue')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      setError('Erreur lors de la mise à jour du projet')
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