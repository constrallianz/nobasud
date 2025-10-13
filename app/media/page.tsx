"use client";

import { useState } from "react";
import { useMediaData } from "@/hooks/useMediaData";
import { getReadTime, getImageUrl } from "@/lib/media-utils";
import MediaNavBar from "@/components/media/MediaNavBar";
import MediaHero from "@/components/media/MediaHero";
import ArticlesGrid from "@/components/media/ArticlesGrid";
import FilterSidebar from "@/components/media/FilterSidebar";
import SidebarWidgets from "@/components/media/SidebarWidgets";
import {
  ErrorState,
  NoArticlesState,
  EmptySearchResults,
} from "@/components/media/MediaStates";
import { Button } from "@/components/ui/button";

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

  // Additional filter states for the enhanced filtering system
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [selectedSortBy, setSelectedSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Handle retry for error state
  const handleRetry = () => {
    window.location.reload();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDateFilter("all");
    setSelectedSortBy("latest");
    setCurrentPage(1);
  };

  // Get secondary articles for hero section
  const secondaryArticles = filteredArticles.slice(1, 5);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Navigation */}
      <MediaNavBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Hero Section with Featured Articles */}
      <MediaHero
        featuredArticle={featuredArticle || undefined}
        secondaryArticles={secondaryArticles}
        loading={loading}
      />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters and Widgets */}
          <aside className="lg:col-span-1 space-y-6">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedDateFilter={selectedDateFilter}
              onDateFilterChange={setSelectedDateFilter}
              selectedSortBy={selectedSortBy}
              onSortByChange={setSelectedSortBy}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onResetFilters={handleResetFilters}
            />
            <SidebarWidgets
              latestArticles={filteredArticles.slice(0, 4)}
              popularArticles={filteredArticles.slice(0, 3)}
            />
          </aside>

          {/* Main Articles Content */}
          <main className="lg:col-span-3">
            {error ? (
              <section className="py-24 bg-white dark:bg-gray-800 rounded-lg">
                <div className="container">
                  <ErrorState error={error} onRetry={handleRetry} />
                </div>
              </section>
            ) : (
              <div className="space-y-8">
                {/* Articles Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {selectedCategory === "all" ? "Toutes les actualités" : "Actualités filtrées"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} trouvé{filteredArticles.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  
                  {/* Sort Options for Mobile */}
                  <div className="lg:hidden">
                    <select
                      value={selectedSortBy}
                      onChange={(e) => setSelectedSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                    >
                      <option value="latest">Plus récent</option>
                      <option value="popular">Plus populaire</option>
                      <option value="trending">Tendances</option>
                      <option value="alphabetical">Alphabétique</option>
                    </select>
                  </div>
                </div>

                {/* Articles Grid */}
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
                      articles={paginatedArticles}
                      loading={false}
                      searchTerm={searchTerm}
                      getImageUrl={getImageUrl}
                      getReadTime={getReadTime}
                    />
                  );
                })()}

                {/* Load More / Pagination */}
                {totalPages > 1 && currentPage < totalPages && (
                  <div className="text-center py-8">
                    <Button
                      onClick={handleLoadMore}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      Charger plus d'articles
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Page {currentPage} sur {totalPages}
                    </p>
                  </div>
                )}

                {/* Results Summary */}
                {filteredArticles.length > 0 && (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700">
                    Affichage de {Math.min(currentPage * articlesPerPage, filteredArticles.length)} sur {filteredArticles.length} articles
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
