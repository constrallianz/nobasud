'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  StarIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ArrowRightIcon,
  CameraIcon,
  CheckCircleIcon,
  UserIcon,
  CalendarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface Feedback {
  id: string
  name: string
  email: string
  company: string | null
  project: string | null
  rating: number
  message: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default function FeedbackPage() {
  const [submitting, setSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [testimonials, setTestimonials] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  const averageRating = testimonials.length > 0 
    ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length 
    : 0

  const stats = [
    { value: testimonials.length > 0 ? `${Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)}%` : '0%', label: 'Clients satisfaits' },
    { value: testimonials.length > 0 ? `${averageRating.toFixed(1)}/5` : '0/5', label: 'Note moyenne' },
    { value: `${testimonials.length}`, label: 'Avis clients' },
    { value: testimonials.length > 0 ? `${Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)}%` : '0%', label: 'Recommandations' }
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (rating === 0) {
      alert('Veuillez donner une note avant d\'envoyer votre avis.')
      return
    }
    
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append('rating', rating.toString())
    
    try {
      const res = await fetch('/api/feedback', { method: 'POST', body: formData })
      if (res.ok) {
        e.currentTarget.reset()
        setRating(0)
        alert('Merci pour votre avis ! Il sera publié après validation.')
      } else {
        alert('Erreur lors de l\'envoi. Veuillez réessayer.')
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    }
    
    setSubmitting(false)
  }

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Avis <span className="text-brand-orange">clients</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              Découvrez l&apos;expérience de nos clients et partagez la vôtre. 
              Votre satisfaction est notre plus belle récompense.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#avis" className="inline-block">
                <Button size="lg" className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-8 py-4 text-lg">
                  Lire les avis
                  <ChatBubbleLeftRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#donner-avis" className="inline-block">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue px-8 py-4 text-lg">
                  Donner mon avis
                  <HeartIcon className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              La satisfaction <span className="text-brand-orange">client</span> en chiffres
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="flex space-x-1 mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIconSolid
                    key={star}
                    className={`w-8 h-8 ${
                      star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {averageRating.toFixed(1)}/5
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section id="avis" className="py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Témoignages <span className="text-brand-orange">clients</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Découvrez les retours d&apos;expérience de nos clients sur leurs projets 
              réalisés avec NOBASUD.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-blue mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des avis clients...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Aucun avis pour le moment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Soyez le premier à partager votre expérience avec NOBASUD.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                          <CheckCircleIcon className="w-5 h-5 text-brand-blue" />
                        </div>
                        {testimonial.email && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.email}</p>
                        )}
                        {testimonial.company && (
                          <p className="text-sm text-brand-orange font-medium">{testimonial.company}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIconSolid
                          key={star}
                          className={`w-5 h-5 ${
                            star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    &quot;{testimonial.message}&quot;
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      {testimonial.project && (
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                          {testimonial.project}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(testimonial.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Voir plus d&apos;avis
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feedback form section */}
      <section id="donner-avis" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Partagez votre <span className="text-brand-orange">expérience</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Votre avis nous aide à améliorer nos services et guide les futurs clients 
                dans leur choix. Merci de prendre quelques minutes pour le partager.
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
                      Entreprise/Organisation
                    </label>
                    <Input name="company" placeholder="Nom de votre entreprise" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Projet réalisé *
                    </label>
                    <Input name="project" required placeholder="Décrivez brièvement le projet" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Votre note globale *
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <StarIconSolid
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoveredRating || rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Votre témoignage *
                  </label>
                  <Textarea 
                    name="comment" 
                    required
                    placeholder="Partagez votre expérience avec NOBASUD : qualité du travail, respect des délais, relation client, satisfaction générale..."
                    className="h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photos du projet (optionnel)
                  </label>
                  <Input 
                    name="photos" 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-blue file:text-white hover:file:bg-brand-blue/90"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG. Max 5 photos de 2MB chacune.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="w-4 h-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400">
                    J&apos;autorise NOBASUD à publier mon témoignage sur son site web et ses supports de communication *
                  </label>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit"
                    disabled={submitting || rating === 0} 
                    size="lg"
                    className="px-8 py-4 text-lg"
                  >
                    {submitting ? 'Envoi en cours...' : 'Publier mon avis'}
                    {!submitting && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
