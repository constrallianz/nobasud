'use client'
import FeedbackHero from '@/components/feedback/FeedbackHero'
import FeedbackForm from '@/components/feedback/FeedbackForm'
import FeedbackReason from '@/components/feedback/FeedbackReason'

export default function FeedbackPage() {
 

  return (
    <div className="font-montserrat relative">
      <FeedbackHero />
      <FeedbackForm  />
      <FeedbackReason />
    </div>
  )
}
