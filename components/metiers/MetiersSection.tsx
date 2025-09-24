import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { MetiersSectionProps } from '@/types/metiers'

export default function MetiersSection({ metiers }: MetiersSectionProps) {
  const sectionTitles = [
    'Construction',
    'Génie civil & Infrastructures', 
    'Aménagements urbains',
    'Projets clés en main'
  ]

  const referenceLabels = [
    'Nos références incluent :',
    'Nous réalisons notamment :',
    'Nos expertises couvrent :',
    'Vous bénéficiez de :'
  ]

  const savoirFaireLabels = [
    'Nos savoir-faire :',
    'Atouts clés :',
    'Notre approche :',
    'Nos garanties :'
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="space-y-24">
          {metiers.map((metier, i) => {
            const IconComponent = metier.icon
            return (
              <div key={metier.title} className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mr-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {sectionTitles[i]}
                    </h2>
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-blue mb-4">{metier.title}</h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {metier.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">
                        {referenceLabels[i]}
                      </h4>
                      <ul className="space-y-2">
                        {metier.references.map((ref, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-brand-orange mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">
                        {savoirFaireLabels[i]}
                      </h4>
                      <ul className="space-y-2">
                        {metier.savoirFaire.map((savoir, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-brand-blue mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{savoir}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={metier.image}
                      alt={`Métier ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
