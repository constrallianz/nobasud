import { StarIcon } from '@heroicons/react/24/solid'
import { type Feedback } from '@/lib/validations'
import FeedbackCard from './FeedbackCard'

interface FeedbackPageStatesProps {
  feedbacks: Feedback[]
  onDelete: (id: string) => Promise<void>
}

export default function FeedbackPageStates({
  feedbacks,
  onDelete
}: FeedbackPageStatesProps) {
  if (feedbacks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <StarIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucun avis trouvé
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Il n&apos;y a pas d&apos;avis correspondant à vos critères de recherche.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}