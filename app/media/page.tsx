'use client'

import { useMediaData } from '@/hooks/useMediaData'
import { getReadTime, getImageUrl } from '@/lib/media-utils'
import MediaHero from '@/components/media/MediaHero'
import MediaCategories from '@/components/media/MediaCategories'
import FeaturedArticle from '@/components/media/FeaturedArticle'
import ArticlesGrid from '@/components/media/ArticlesGrid'
import Newsletter from '@/components/media/Newsletter'
import { 
  ErrorState, 
  NoArticlesState, 
  EmptySearchResults 
} from '@/components/media/MediaStates'

export default function MediaPage() {
  const {
    searchTerm,
    selectedCategory,
    loading,
    error,
    categories,
    featuredArticle,
    filteredArticles,
    setSearchTerm,
    setSelectedCategory
  } = useMediaData()

  // Handle retry for error state
  const handleRetry = () => {
    window.location.reload()
  }

  // Handle clearing search
  const handleClearSearch = () => {
    setSearchTerm('')
    setSelectedCategory('all')
  }

  return (
    <div className="relative">
      {/* Hero Section with Search */}
      <MediaHero 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {/* Categories Filter */}
      {/* <MediaCategories 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      /> */}
      
      {/* Error State */}
      {error && (
        <section className="py-24 bg-white dark:bg-gray-800">
          <div className="container">
            <ErrorState error={error} onRetry={handleRetry} />
          </div>
        </section>
      )}

      {!error && (
        <>
          {/* Featured Article */}
          <FeaturedArticle 
            article={featuredArticle}
            loading={loading}
            getImageUrl={getImageUrl}
            getReadTime={getReadTime}
          />
          
          {/* Articles Grid */}
          <section className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Derniers <span className="text-brand-orange">articles</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Découvrez nos dernières publications sur l&apos;actualité du BTP, 
                  nos projets et nos innovations.
                </p>
              </div>

              {/* Show appropriate state based on data */}
              {(() => {
                if (loading) {
                  return (
                    <ArticlesGrid 
                      articles={[]}
                      loading={true}
                      searchTerm={searchTerm}
                      getImageUrl={getImageUrl}
                      getReadTime={getReadTime}
                    />
                  )
                }

                if (filteredArticles.length === 0) {
                  return searchTerm ? (
                    <EmptySearchResults 
                      searchTerm={searchTerm}
                      onClearSearch={handleClearSearch}
                    />
                  ) : (
                    <NoArticlesState />
                  )
                }

                return (
                  <ArticlesGrid 
                    articles={filteredArticles}
                    loading={false}
                    searchTerm={searchTerm}
                    getImageUrl={getImageUrl}
                    getReadTime={getReadTime}
                  />
                )
              })()}
            </div>
          </section>
        </>
      )}
      
      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}
