"use client";

import { useMediaData } from "@/hooks/useMediaData";
import { getReadTime, getImageUrl } from "@/lib/media-utils";
import MediaHero from "@/components/media/MediaHero";
import MediaCategories from "@/components/media/MediaCategories";
import FeaturedArticle from "@/components/media/FeaturedArticle";
import ArticlesGrid from "@/components/media/ArticlesGrid";
import Newsletter from "@/components/media/Newsletter";
import {
  ErrorState,
  NoArticlesState,
  EmptySearchResults,
} from "@/components/media/MediaStates";
import { categories } from "@/data/media";

export default function MediaPage() {
  const {
    searchTerm,
    selectedCategory,
    loading,
    error,
    featuredArticle,
    filteredArticles,
    setSearchTerm,
    setSelectedCategory,
  } = useMediaData();

  // Handle retry for error state
  const handleRetry = () => {
    window.location.reload();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <div className="relative font-montserrat">
      {/* Hero Section with Search */}
      <MediaHero />

      {/* Categories Filter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
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
                <FeaturedArticle
                  article={featuredArticle}
                  loading={loading}
                  getImageUrl={getImageUrl}
                  getReadTime={getReadTime}
                />
                
                {/* Articles Grid */}
                <section className="py-24 bg-gray-50 dark:bg-gray-900">
                  <MediaCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
                  <div className="container">
                    <div className="text-center mb-16">
                      <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6 text-center">
                        Derniers articles
                      </h2>
                      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Découvrez nos dernières publications sur
                        l&apos;actualité du BTP, nos projets et nos innovations.
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
                        );
                      }

                      if (filteredArticles.length === 0) {
                        return searchTerm ? (
                          <EmptySearchResults
                            searchTerm={searchTerm}
                            onClearSearch={handleClearSearch}
                          />
                        ) : (
                          <NoArticlesState />
                        );
                      }

                      return (
                        <ArticlesGrid
                          articles={filteredArticles}
                          loading={false}
                          searchTerm={searchTerm}
                          getImageUrl={getImageUrl}
                          getReadTime={getReadTime}
                        />
                      );
                    })()}
                  </div>
                </section>
              </>
            )}

            {/* Newsletter Section */}
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}
