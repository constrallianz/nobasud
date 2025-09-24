'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AvisForm } from '@/components/admin/avis/edit/AvisForm'
import AvisFormPageHeader from '@/components/admin/avis/shared/AvisFormPageHeader'
import LoadingState from '@/components/admin/avis/states/LoadingState'
import ErrorState from '@/components/admin/avis/states/ErrorState'
import { type Feedback } from '@/lib/validations'

interface EditAvisPageProps {
  params: {
    id: string
  }
}

export default function EditAvisPage({ params }: EditAvisPageProps) {
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`/api/admin/feedbacks/${params.id}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Erreur lors de la récupération de l\'avis')
        }
        const data = await response.json()
        setFeedback(data)
      } catch (err) {
        console.error('Error fetching feedback:', err)
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchFeedback()
    }
  }, [params.id])

  const handleSubmit = async (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isSubmitting || !feedback) return
    
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/feedbacks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la mise à jour de l\'avis')
      }

      router.push('/admin/avis')
      router.refresh()
    } catch (err) {
      console.error('Error updating feedback:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
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