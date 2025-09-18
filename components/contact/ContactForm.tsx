'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ClockIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      if (res.ok) {
        e.currentTarget.reset()
        alert('Message envoyé avec succès ! Nous vous recontacterons rapidement.')
      } else {
        alert('Erreur lors de l\'envoi. Veuillez réessayer.')
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    }
    
    setSubmitting(false)
  }

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-800">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Demandez votre <span className="text-brand-orange">devis</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Décrivez-nous votre projet et recevez une estimation personnalisée 
              sous 48h. Tous nos devis sont gratuits et sans engagement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Formulaire de contact</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      Téléphone
                    </label>
                    <Input name="phone" placeholder="+212 6XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type de projet *
                    </label>
                    <select 
                      name="projectType" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="batiment">Construction de bâtiments</option>
                      <option value="infrastructure">Infrastructure routière</option>
                      <option value="amenagement">Aménagement urbain</option>
                      <option value="renovation">Rénovation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget estimé
                  </label>
                  <select 
                    name="budget"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    <option value="< 500k">Moins de 500 000 MAD</option>
                    <option value="500k-1M">500 000 - 1 000 000 MAD</option>
                    <option value="1M-5M">1 000 000 - 5 000 000 MAD</option>
                    <option value="5M-10M">5 000 000 - 10 000 000 MAD</option>
                    <option value="> 10M">Plus de 10 000 000 MAD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description du projet *
                  </label>
                  <Textarea 
                    name="message" 
                    required
                    placeholder="Décrivez votre projet en détail : localisation, superficie, contraintes particulières, délais souhaités..."
                    className="h-32"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={submitting} 
                  size="lg"
                  className="w-full py-4 text-lg"
                >
                  {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  {!submitting && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                </Button>
              </form>
            </div>

            {/* Why choose us */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Pourquoi nous choisir ?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Réactivité garantie</h4>
                      <p className="text-gray-600 dark:text-gray-400">Réponse sous 24h et devis personnalisé sous 48h.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BuildingOfficeIcon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Expertise reconnue</h4>
                      <p className="text-gray-600 dark:text-gray-400">Plus de 15 ans d&apos;expérience dans le BTP au Maroc.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Couverture nationale</h4>
                      <p className="text-gray-600 dark:text-gray-400">Intervention dans tout le Maroc avec nos équipes locales.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-blue to-brand-orange p-8 rounded-2xl text-white">
                <h4 className="text-xl font-bold mb-4">Besoin d&apos;une intervention urgente ?</h4>
                <p className="mb-6">
                  Notre équipe d&apos;urgence est disponible 24h/24 pour les interventions critiques.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  Appeler maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
