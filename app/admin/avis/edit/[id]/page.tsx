'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AvisForm } from '@/components/admin/avis/edit/AvisForm'
import AvisFormPageHeader from '@/components/admin/avis/shared/AvisFormPageHeader'
import LoadingState from '@/components/admin/avis/states/LoadingState'
import ErrorState from '@/components/admin/avis/states/ErrorState'
import { type Feedback } from '@/lib/validations'
import { useFeedbacks } from '@/hooks/useFeedbacks'

interface EditAvisPageProps {
  params: {
    id: string
  }
}

export default function EditAvisPage({ params }: EditAvisPageProps) {
  const { fetchFeedbackById, updateFeedback } = useFeedbacks()
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await fetchFeedbackById(params.id)
        if (!data) {
          throw new Error('Avis non trouvé')
        }
        setFeedback(data)
      } catch (err) {
        console.error('Error fetching feedback:', err)
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      loadFeedback()
    }
  }, [params.id, fetchFeedbackById])

  const handleSubmit = async (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isSubmitting || !feedback) return
    
    setIsSubmitting(true)
    setError(null)

    const result = await updateFeedback(params.id, data)
    
    if (result.success) {
      router.push('/admin/avis')
      router.refresh()
    } else {
      setError(result.error || 'Une erreur est survenue')
    }
    
    setIsSubmitting(false)
  }

  const handleCancel = () => {
    router.push('/admin/avis')
  }

  if (error) {
    return <ErrorState error={error} />
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (!feedback) {
    return <ErrorState error="Avis non trouvé" />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AvisFormPageHeader title="Modifier l'Avis" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AvisForm
            initialData={feedback}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            mode="edit"
          />
        </div>
      </div>
    </div>
  )
}