import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { ApprochCaseStudiesProps } from '@/types/approche'

export default function ApprochCaseStudies({ caseStudies }: ApprochCaseStudiesProps) {
  return (
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
  )
}