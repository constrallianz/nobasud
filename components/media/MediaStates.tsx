import { MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

// Loading state for articles grid
export function ArticlesGridSkeleton() {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => ({
    id: `skeleton-${Date.now()}-${index}`,
    index
  }))

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skeletonItems.map((item) => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
          <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-3">
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Loading state for featured article
export function FeaturedArticleSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 lg:h-[500px] bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-8 w-3/4"></div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div>
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error state component
interface ErrorStateProps {
  error: string
  onRetry?: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {error}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Réessayer
        </Button>
      )}
    </div>
  )
}

// Empty search results
interface EmptySearchProps {
  searchTerm: string
  onClearSearch: () => void
}

export function EmptySearchResults({ searchTerm, onClearSearch }: EmptySearchProps) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Aucun article trouvé
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Aucun article ne correspond à votre recherche &quot;{searchTerm}&quot;.
        Essayez avec des termes différents.
      </p>
      <Button onClick={onClearSearch} variant="outline">
        Effacer la recherche
      </Button>
    </div>
  )
}

// No articles state
export function NoArticlesState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Aucun article publié
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Il n&apos;y a pas d&apos;articles publiés pour le moment. 
        Revenez bientôt pour découvrir nos dernières actualités.
      </p>
    </div>
  )
}