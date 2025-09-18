import { Benefit } from '@/types/career'
import { 
  CurrencyDollarIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const benefits: Benefit[] = [
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

export default function CareerBenefits() {
  return (
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
  )
}
