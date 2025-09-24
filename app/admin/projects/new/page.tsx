'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectFormPageHeader from '@/components/admin/projects/shared/ProjectFormPageHeader'
import ProjectFormContainer from '@/components/admin/projects/shared/ProjectFormContainer'
import { type Project } from '@/lib/validations'

export default function NewProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      router.push('/admin/projects')
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Erreur lors de la création du projet')
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