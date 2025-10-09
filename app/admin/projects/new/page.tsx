'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectFormPageHeader from '@/components/admin/projects/shared/ProjectFormPageHeader'
import ProjectFormContainer from '@/components/admin/projects/shared/ProjectFormContainer'
import { type Project } from '@/lib/validations'
import { useProjects } from '@/components/admin/projects/listing/useProjects'

export default function NewProjectPage() {
  const { createProject } = useProjects()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      
      // Add existing image URLs (from URL input)
      const existingImages = data.images?.filter(img => !img.startsWith('blob:')) || []
      form.append('images', JSON.stringify(existingImages))
      
      // Add new files
      if (data.imageFiles && data.imageFiles.length > 0) {
        data.imageFiles.forEach(file => {
          form.append('imageFiles', file)
        })
      }

      const result = await createProject(form)

      if (result.success) {
        router.push('/admin/projects')
      } else {
        setError(result.error || 'Une erreur est survenue')
        alert(result.error || 'Erreur lors de la création du projet')
      }
    } catch (error) {
      console.error('Error creating project:', error)
      const errorMsg = 'Erreur lors de la création du projet'
      setError(errorMsg)
      alert(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectFormPageHeader title="Nouveau projet" />
      <ProjectFormContainer
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Créer le projet"
      />
    </div>
  )
}