'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  ChartBarIcon, 
  CogIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  UsersIcon,
  LightBulbIcon,
  BeakerIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

export default function NotreApprochePage() {
  const [activePhase, setActivePhase] = useState(0)

  const methodology = [
    {
      icon: ClipboardDocumentListIcon,
      title: 'Analyse & Conception',
      duration: '2-4 semaines',
      description: 'Étude approfondie de vos besoins, analyse du terrain et conception détaillée du projet.',
      steps: [
        'Étude de faisabilité technique et financière',
        'Analyse des contraintes réglementaires',
        'Conception architecturale et technique',
        'Validation du cahier des charges'
      ]
    },
    {
      icon: CogIcon,
      title: 'Planification',
      duration: '1-2 semaines',
      description: 'Organisation méthodique des ressources, planning détaillé et préparation des équipes.',
      steps: [
        'Planification des ressources humaines et matérielles',
        'Établissement du planning de réalisation',
        'Coordination avec les sous-traitants',
        'Mise en place des procédures qualité'
      ]
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Exécution',
      duration: 'Variable',
      description: 'Réalisation du projet avec un suivi quotidien et un contrôle qualité permanent.',
      steps: [
        'Mobilisation des équipes et matériels',
        'Exécution selon les standards NOBASUD',
        'Contrôle qualité à chaque étape',
        'Reporting régulier d\'avancement'
      ]
    },
    {
      icon: CheckCircleIcon,
      title: 'Livraison & SAV',
      duration: '1 semaine',
      description: 'Réception des travaux, formation et service après-vente pour votre satisfaction.',
      steps: [
        'Tests et vérifications finales',
        'Formation à l\'utilisation si nécessaire',
        'Remise des documents techniques',
        'Garantie et service après-vente'
      ]
    }
  ]

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Qualité & Sécurité',
      description: 'Nous appliquons les normes les plus strictes en matière de qualité et de sécurité sur tous nos chantiers.',
      benefits: [
        'Certification ISO 9001 & 45001',
        'Contrôle qualité à chaque étape',
        'Formation continue des équipes',
        'Zéro accident comme objectif'
      ]
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'Nous intégrons les dernières technologies et méthodes pour optimiser vos projets.',
      benefits: [
        'Techniques de construction modernes',
        'Matériaux écologiques et durables',
        'Digitalisation des processus',
        'R&D continue'
      ]
    },
    {
      icon: UsersIcon,
      title: 'Accompagnement',
      description: 'Un suivi personnalisé et une communication transparente tout au long du projet.',
      benefits: [
        'Chef de projet dédié',
        'Reporting hebdomadaire',
        'Disponibilité 24h/24',
        'Support après livraison'
      ]
    }
  ]

  const caseStudies = [
    {
      title: 'Centre Commercial Atlas Mall',
      location: 'Casablanca',
      challenge: 'Construction d\'un centre commercial de 50 000 m² en zone urbaine dense',
      solution: 'Approche modulaire avec préfabrication pour réduire les nuisances',
      results: [
        'Livraison avec 2 mois d\'avance',
        'Réduction de 30% des nuisances sonores',
        '15% d\'économie sur le budget initial',
        'Certification environnementale HQE'
      ],
      image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Autoroute Marrakech-Ouarzazate',
      location: 'Région Sud',
      challenge: 'Traversée de zones montagneuses avec contraintes géologiques',
      solution: 'Études géotechniques approfondies et techniques spécialisées',
      results: [
        'Aucun dépassement de délai',
        'Résistance aux conditions extrêmes',
        'Impact environnemental minimal',
        'Création de 200 emplois locaux'
      ],
      image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Notre <span className="text-brand-orange">approche</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              Une méthodologie éprouvée, des valeurs fortes et un engagement total 
              pour la réussite de vos projets de construction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#methodologie" className="inline-block">
                <Button size="lg" className="bg-white text-brand-blue hover:bg-white/90 px-8 py-4 text-lg">
                  Notre méthode
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#etudes-cas" className="inline-block">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-blue px-8 py-4 text-lg">
                  Études de cas
                  <PlayIcon className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology section */}
      <section id="methodologie" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre <span className="text-brand-orange">méthodologie</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus structuré en 4 phases pour garantir la réussite de votre projet 
              du concept à la livraison.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Phase navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {methodology.map((phase, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhase(i)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activePhase === i
                      ? 'bg-brand-blue text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Phase {i + 1}: {phase.title}
                </button>
              ))}
            </div>

            {/* Active phase content */}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mr-4">
                      {(() => {
                        const IconComponent = methodology[activePhase].icon
                        return <IconComponent className="w-8 h-8 text-white" />
                      })()}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {methodology[activePhase].title}
                      </h3>
                      <p className="text-brand-orange font-medium">
                        Durée: {methodology[activePhase].duration}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {methodology[activePhase].description}
                  </p>

                  <div className="space-y-4">
                    {methodology[activePhase].steps.map((step, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircleIcon className="w-6 h-6 text-brand-blue mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 rounded-2xl flex items-center justify-center">
                    {(() => {
                      const IconComponent = methodology[activePhase].icon
                      return <IconComponent className="w-32 h-32 text-brand-blue" />
                    })()}
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">
                    {activePhase + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="text-brand-orange">valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes fondamentaux qui guident notre action et garantissent 
              l&apos;excellence de nos réalisations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const IconComponent = value.icon
              return (
                <div key={i} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{value.description}</p>
                  
                  <div className="space-y-3">
                    {value.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-brand-orange rounded-full mr-3"></div>
                        <p className="text-sm text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Case studies section */}
      <section id="etudes-cas" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Études de <span className="text-brand-orange">cas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment notre approche a permis de relever des défis complexes 
              et de livrer des projets exceptionnels.
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.map((study, i) => (
              <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{study.location}</p>
                    </div>
                  </div>
                </div>

                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{study.title}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-brand-blue mb-2">Défi</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-brand-blue mb-2">Solution NOBASUD</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-brand-blue mb-3">Résultats obtenus</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-brand-orange mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6">
                    Voir le projet complet
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <BeakerIcon className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Innovation & <span className="text-brand-orange">Recherche</span>
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Nous investissons continuellement dans la recherche et le développement 
              pour vous offrir les solutions les plus avancées du marché.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5%</div>
                <p>du CA investi en R&D</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">12</div>
                <p>brevets déposés</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">3</div>
                <p>laboratoires partenaires</p>
              </div>
            </div>

            <Button size="lg" className="mt-8 bg-white text-brand-blue hover:bg-white/90 px-8 py-4">
              Découvrir nos innovations
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
