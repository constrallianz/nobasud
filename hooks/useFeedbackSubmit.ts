import { useState } from 'react'

interface FeedbackSubmitResult {
  success: boolean
  error?: string
}

export function useFeedbackSubmit() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitFeedback = async (formData: FormData): Promise<FeedbackSubmitResult> => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        setSuccess(true)
        setSubmitting(false)
        return { success: true }
      } else {
        const errorMessage = 'Erreur lors de l\'envoi. Veuillez réessayer.'
        setError(errorMessage)
        setSubmitting(false)
        return { success: false, error: errorMessage }
      }
    } catch (error) {
      console.error('Feedback submission error:', error)
      const errorMessage = 'Erreur lors de l\'envoi. Veuillez réessayer.'
      setError(errorMessage)
      setSubmitting(false)
      return { success: false, error: errorMessage }
    }
  }

  const resetForm = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    submitting,
    error,
    success,
    submitFeedback,
    resetForm,
  }
}
