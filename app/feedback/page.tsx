'use client'
import { useState, useEffect } from 'react'
import { Feedback } from '@/types/feedback'
import FeedbackHero from '@/components/feedback/FeedbackHero'
import FeedbackStats from '@/components/feedback/FeedbackStats'
import TestimonialsGrid from '@/components/feedback/TestimonialsGrid'
import FeedbackForm from '@/components/feedback/FeedbackForm'

export default function FeedbackPage() {
  const [testimonials, setTestimonials] = useState<Feedback[]>([])

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/feedback')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    }
  }

  return (
    <div className="relative">
      <FeedbackHero />
      <FeedbackStats testimonials={testimonials} />
      <TestimonialsGrid />
      <FeedbackForm />
    </div>
  )
}
