'use client'

import { useState } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNewsletterSubmit } from '@/hooks/useNewsletterSubmit'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { submitNewsletter, isSubmitting } = useNewsletterSubmit()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    
    const result = await submitNewsletter(email)
    
    if (result.success) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 5000)
    } else {
      setErrorMessage(result.error || 'Une erreur est survenue')
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <BellIcon className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Restez informé de nos actualités
          </h2>
          
          <p className="text-lg text-white/90 mb-8">
            Recevez nos dernières innovations, projets et actualités directement dans votre boîte mail
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 bg-white/20 border-white/30 placeholder-white/70 text-white disabled:opacity-50 h-12 text-base"
                />
                <Button 
                  type="submit" 
                  variant="secondary"
                  disabled={isSubmitting}
                  className="bg-white hover:bg-gray-100 text-primary font-semibold disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8"
                >
                  {isSubmitting ? 'Inscription...' : "S'abonner"}
                </Button>
              </div>
              
              {errorMessage && (
                <p className="text-sm text-red-200 bg-red-500/20 px-4 py-3 rounded mt-4">
                  {errorMessage}
                </p>
              )}
              
              <p className="text-sm text-white/70 mt-4">
                En vous abonnant, vous acceptez de recevoir nos actualités par email. 
                Vous pourrez vous désabonner à tout moment.
              </p>
            </form>
          ) : (
            <div className="bg-white/20 rounded-lg py-8 px-6 max-w-xl mx-auto">
              <div className="text-2xl text-white font-semibold mb-2">✓ Inscription confirmée !</div>
              <p className="text-white/90">
                Merci pour votre abonnement. Vous recevrez bientôt nos actualités.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
