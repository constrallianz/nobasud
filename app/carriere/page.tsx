'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface Job {
  id: string
  title: string
  slug: string
  department: string | null
  location: string | null
  description: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default function CarrierePage() {
  const [submitting, setSubmitting] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: 'Rémunération attractive',
      description: 'Salaires compétitifs avec primes de performance et avantages sociaux'
    },
    {
      icon: AcademicCapIcon,
      title: 'Formation continue',
      description: 'Programmes de formation et certification pour développer vos compétences'
    },
    {
      icon: UserGroupIcon,
      title: 'Équipe dynamique',
      description: 'Environnement collaboratif avec des professionnels passionnés'
    },
    {
      icon: BriefcaseIcon,
      title: 'Évolution de carrière',
      description: 'Opportunités de progression et mobilité interne'
    }
  ]

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
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rejoignez <span className="text-brand-orange">l&apos;équipe</span> NOBASUD
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              Construisez votre carrière avec nous et participez à des projets 
              qui transforment le paysage urbain du Maroc.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#offres" className="inline-block">
                <Button size="lg" className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-8 py-4 text-lg">
                  Voir les offres
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#candidature" className="inline-block">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue px-8 py-4 text-lg">
                  Candidature spontanée
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Pourquoi nous <span className="text-brand-orange">rejoindre</span> ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Chez NOBASUD, nous investissons dans notre capital humain et offrons 
              un environnement de travail stimulant et épanouissant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => {
              const IconComponent = benefit.icon
              return (
                <div key={i} className="group text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Jobs section */}
      <section id="offres" className="py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Offres d&apos;<span className="text-brand-orange">emploi</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Découvrez nos opportunités actuelles et trouvez le poste qui correspond 
              à vos compétences et aspirations professionnelles.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-blue mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des offres d'emploi...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Aucune offre disponible pour le moment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Consultez cette page régulièrement ou envoyez-nous une candidature spontanée.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {jobs.map((job) => (
                <div key={job.id} className="group bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-brand-orange/20">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-blue transition-colors">
                          {job.title}
                        </h3>
                        {job.department && (
                          <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm font-medium rounded-full">
                            {job.department}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {job.location && (
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                        )}
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          Publié le {new Date(job.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-4 lg:mt-0 group">
                      Postuler
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {job.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {job.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Spontaneous application section */}
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
    </div>
  )
}
