import { useState } from 'react'

interface ContactData {
  name: string
  email: string
  message: string
  phone?: string
  company?: string
}

interface ContactFormResult {
  success: boolean
  message?: string
  details?: Record<string, string>
  error?: string
}

export function useContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitContact = async (contactData: ContactData): Promise<ContactFormResult> => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setSuccess(true)
        setSubmitting(false)
        return result
      } else {
        const errorMessage = result.message || result.error || 'Erreur lors de l\'envoi'
        setError(errorMessage)
        setSubmitting(false)
        return result
      }
    } catch (error) {
      console.error('Contact form error:', error)
      const errorMessage = 'Erreur lors de l\'envoi. Veuillez réessayer.'
      setError(errorMessage)
      setSubmitting(false)
      return {
        success: false,
        error: errorMessage,
      }
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
    submitContact,
    resetForm,
  }
}
