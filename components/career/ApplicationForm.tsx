'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function ApplicationForm() {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/applications', { method: 'POST', body: formData })
      if (res.ok) {
        e.currentTarget.reset()
        alert('Candidature envoyée avec succès ! Nous vous recontacterons rapidement.')
      } else {
        alert('Erreur lors de l\'envoi. Veuillez réessayer.')
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    }
    
    setSubmitting(false)
  }

  return (
    <section id="candidature" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Candidature <span className="text-brand-orange">spontanée</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Vous ne trouvez pas d&apos;offre correspondant à votre profil ? 
              Envoyez-nous votre candidature, nous étudierons votre dossier avec attention.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <Input name="name" required placeholder="Votre nom et prénom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input name="email" type="email" required placeholder="votre@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CV (PDF) *
                  </label>
                  <Input name="cv" type="file" accept="application/pdf" required />
                  <p className="text-xs text-gray-500 mt-1">Format PDF uniquement, max 5MB</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lettre de motivation (PDF)
                  </label>
                  <Input name="coverLetter" type="file" accept="application/pdf" />
                  <p className="text-xs text-gray-500 mt-1">Optionnel, format PDF</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message personnel
                </label>
                <Textarea 
                  name="message" 
                  placeholder="Parlez-nous de votre motivation, vos compétences et ce que vous pouvez apporter à NOBASUD..."
                  className="h-32"
                />
              </div>

              <div className="text-center">
                <Button 
                  type="submit"
                  disabled={submitting} 
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  {submitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                  {!submitting && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
