import { RealisationsStatsProps } from '@/types/realisations'

export default function RealisationsStats({ stats }: RealisationsStatsProps) {
  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Nos <span className="text-brand-orange">performances</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Des chiffres qui témoignent de notre expertise et de notre engagement 
            pour la qualité dans chaque projet.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stat.label}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}