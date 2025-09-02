'use client'
import { useState } from 'react'
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

export default function CarrierePage() {
  const [submitting, setSubmitting] = useState(false)

  const jobs = [
    {
      id: 1,
      title: 'Ingénieur Travaux Senior',
      department: 'Technique',
      location: 'Casablanca',
      type: 'CDI',
      experience: '5+ ans',
      salary: '25,000 - 35,000 MAD',
      description: 'Nous recherchons un ingénieur expérimenté pour superviser nos chantiers de construction et coordonner les équipes techniques.',
      requirements: [
        'Diplôme d\'ingénieur en génie civil ou BTP',
        'Minimum 5 ans d\'expérience en conduite de travaux',
        'Maîtrise des logiciels AutoCAD et MS Project',
        'Excellentes capacités de leadership et communication',
        'Permis de conduire obligatoire'
      ],
      benefits: [
        'Salaire attractif avec primes de performance',
        'Assurance santé familiale',
        'Formation continue',
        'Véhicule de fonction',
        'Évolution de carrière rapide'
      ],
      posted: '2024-01-15'
    },
    {
      id: 2,
      title: 'Chef de Projet Infrastructure',
      department: 'Technique',
      location: 'Marrakech',
      type: 'CDI',
      experience: '7+ ans',
      salary: '30,000 - 45,000 MAD',
      description: 'Poste stratégique pour diriger nos projets d\'infrastructure routière et urbaine dans la région de Marrakech.',
      requirements: [
        'Diplôme d\'ingénieur en génie civil',
        'Expérience confirmée en projets d\'infrastructure',
        'Certification PMP appréciée',
        'Maîtrise de l\'anglais et du français',
        'Capacité à gérer des équipes multidisciplinaires'
      ],
      benefits: [
        'Package salarial compétitif',
        'Bonus annuel selon performance',
        'Assurance vie et santé',
        'Formations internationales',
        'Opportunités d\'évolution'
      ],
      posted: '2024-01-10'
    },
    {
      id: 3,
      title: 'Architecte Paysagiste',
      department: 'Design',
      location: 'Agadir',
      type: 'CDI',
      experience: '3+ ans',
      salary: '18,000 - 25,000 MAD',
      description: 'Rejoignez notre équipe créative pour concevoir des espaces verts innovants et durables.',
      requirements: [
        'Diplôme en architecture paysagère ou équivalent',
        'Portfolio démontrant votre créativité',
        'Maîtrise des logiciels de conception (Rhino, SketchUp)',
        'Connaissance des essences végétales locales',
        'Sensibilité environnementale'
      ],
      benefits: [
        'Environnement de travail créatif',
        'Projets variés et stimulants',
        'Formation aux nouvelles technologies',
        'Flexibilité horaires',
        'Prime de performance'
      ],
      posted: '2024-01-08'
    },
    {
      id: 4,
      title: 'Responsable QSE',
      department: 'Qualité',
      location: 'Casablanca',
      type: 'CDI',
      experience: '4+ ans',
      salary: '22,000 - 28,000 MAD',
      description: 'Garantir la qualité, la sécurité et l\'environnement sur tous nos projets en cours.',
      requirements: [
        'Formation en HSE ou ingénierie',
        'Certification ISO 9001, 14001, 45001',
        'Expérience en milieu BTP',
        'Rigueur et sens de l\'organisation',
        'Capacités de formation et sensibilisation'
      ],
      benefits: [
        'Rôle transversal et valorisant',
        'Formation continue certifiante',
        'Véhicule de fonction',
        'Assurance santé complète',
        'Évolution vers des postes de direction'
      ],
      posted: '2024-01-05'
    }
  ]

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

          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.map((job, i) => (
              <div key={i} className="group bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-brand-orange/20">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-blue transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm font-medium rounded-full">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <BriefcaseIcon className="w-4 h-4 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {job.experience}
                      </div>
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="mt-4 lg:mt-0 group">
                    Postuler
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Profil recherché :</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Nous offrons :</h4>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
