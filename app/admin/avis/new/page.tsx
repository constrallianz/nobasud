'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AvisFormPageHeader from '@/components/admin/avis/shared/AvisFormPageHeader'
import AvisFormContainer from '@/components/admin/avis/shared/AvisFormContainer'
import LoadingState from '@/components/admin/avis/states/LoadingState'
import ErrorState from '@/components/admin/avis/states/ErrorState'
import { type Feedback } from '@/lib/validations'
import { useFeedbacks } from '@/hooks/useFeedbacks'

export default function NewAvisPage() {
  const { createFeedback } = useFeedbacks()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setError(null)

    const result = await createFeedback(data)
    
    if (result.success) {
      router.push('/admin/avis')
      router.refresh()
    } else {
      setError(result.error || 'Une erreur est survenue')
    }
    
    setIsSubmitting(false)
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