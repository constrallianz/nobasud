'use client'

import FeedbackCard from '@/components/admin/avis/FeedbackCard'
import FeedbackFilters from '@/components/admin/avis/FeedbackFilters'
import FeedbackStats from '@/components/admin/avis/FeedbackStats'
import { PageHeader, LoadingState, ErrorState, EmptyState } from '@/components/admin/avis/FeedbackPageStates'
import { useFeedbacks, useFeedbackFilters } from '@/hooks/useFeedbacks'

export default function AdminAvisPage() {
  const { feedbacks, loading, error, deleteFeedback } = useFeedbacks()
  const {
    searchTerm,
    setSearchTerm,
    selectedZone,
    setSelectedZone,
    zoneOptions,
    filteredFeedbacks
  } = useFeedbackFilters(feedbacks)

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        filteredCount={filteredFeedbacks.length} 
        searchTerm={searchTerm} 
      />

      <FeedbackStats feedbacks={feedbacks} />

      <FeedbackFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        zoneOptions={zoneOptions}
      />

      {filteredFeedbacks.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {filteredFeedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                onDelete={deleteFeedback}
              />
            ))}
          </ul>
        </div>
      ) : (
        <EmptyState 
          selectedZone={selectedZone} 
          zoneOptions={zoneOptions} 
        />
      )}
    </div>
  )
}
