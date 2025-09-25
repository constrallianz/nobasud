'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer une adresse email valide')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Simulate API call for newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubscribed(true)
      setEmail('')
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Merci pour votre <span className="text-brand-orange">inscription</span>
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Vous recevrez bientôt nos derniers articles et actualités 
              directement dans votre boîte email.
            </p>
            <Button 
              onClick={() => setIsSubscribed(false)}
              className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white/90 dark:hover:bg-gray-800/90"
            >
              S&apos;abonner avec une autre adresse
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Restez <span className="text-brand-orange">informé</span>
          </h2>
          <p className="text-xl leading-relaxed mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles 
            et actualités directement dans votre boîte email.
          </p>
          
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-gray-900 dark:text-gray-100"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white/90 dark:hover:bg-gray-800/90 px-6"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-blue"></div>
                  ) : (
                    'S&apos;abonner'
                  )}
                </Button>
              </div>
              
              {error && (
                <p className="text-sm text-red-200 bg-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
            </form>
            
            <p className="text-sm opacity-75 mt-3">
              Pas de spam, désabonnement facile à tout moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
