'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AvisFormPageHeader from '@/components/admin/avis/shared/AvisFormPageHeader'
import AvisFormContainer from '@/components/admin/avis/shared/AvisFormContainer'
import LoadingState from '@/components/admin/avis/states/LoadingState'
import ErrorState from '@/components/admin/avis/states/ErrorState'
import { type Feedback } from '@/lib/validations'

export default function NewAvisPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création de l\'avis')
      }

      router.push('/admin/avis')
      router.refresh()
    } catch (err) {
      console.error('Error creating feedback:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return <ErrorState error={error} />
  }

  if (isSubmitting) {
    return <LoadingState />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AvisFormPageHeader title="Nouvel Avis" />
      <AvisFormContainer 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Créer l'avis"
      />
    </div>
  )
}