import { useState } from 'react'

interface UseNewsletterSubmitReturn {
  submitNewsletter: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>
  isSubmitting: boolean
}

export function useNewsletterSubmit(): UseNewsletterSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitNewsletter = async (email: string) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Une erreur est survenue',
        }
      }

      return {
        success: true,
        message: data.message || 'Inscription réussie!',
      }
    } catch (err) {
      console.error('Newsletter submission error:', err)
      return {
        success: false,
        error: 'Une erreur est survenue lors de l\'inscription',
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submitNewsletter,
    isSubmitting,
  }
}
