import { Feedback, FeedbackStat } from '@/types/feedback'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface FeedbackStatsProps {
  readonly testimonials: Feedback[]
}

export default function FeedbackStats({ testimonials }: FeedbackStatsProps) {
  const averageRating = testimonials.length > 0 
    ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length 
    : 0

  const stats: FeedbackStat[] = [
    { 
      value: testimonials.length > 0 ? `${Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)}%` : '0%', 
      label: 'Clients satisfaits' 
    },
    { 
      value: testimonials.length > 0 ? `${averageRating.toFixed(1)}/5` : '0/5', 
      label: 'Note moyenne' 
    },
    { 
      value: `${testimonials.length}`, 
      label: 'Avis clients' 
    },
    { 
      value: testimonials.length > 0 ? `${Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)}%` : '0%', 
      label: 'Recommandations' 
    }
  ]

  return (
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
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
