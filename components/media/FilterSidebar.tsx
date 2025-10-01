'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, FunnelIcon, CalendarIcon, TagIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FilterSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedDateFilter: string
  onDateFilterChange: (filter: string) => void
  selectedSortBy: string
  onSortByChange: (sort: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  onResetFilters: () => void
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedDateFilter,
  onDateFilterChange,
  selectedSortBy,
  onSortByChange,
  searchTerm,
  onSearchChange,
  onResetFilters
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    dateFilter: true,
    sortBy: true,
    tags: false
  })

  const categories = [
    { id: 'all', name: 'Toutes les actualités', count: 47 },
    { id: 'projets', name: 'Nos Projets', count: 12 },
    { id: 'innovation', name: 'Innovation & BTP', count: 8 },
    { id: 'partenariats', name: 'Partenariats', count: 5 },
    { id: 'environnement', name: 'Développement Durable', count: 7 },
    { id: 'formation', name: 'Formation & Emploi', count: 9 },
    { id: 'recompenses', name: 'Prix & Récompenses', count: 6 }
  ]

  const dateFilters = [
    { id: 'all', name: 'Toutes les dates' },
    { id: 'today', name: 'Aujourd\'hui' },
    { id: 'week', name: 'Cette semaine' },
    { id: 'month', name: 'Ce mois-ci' },
    { id: 'quarter', name: 'Ce trimestre' },
    { id: 'year', name: 'Cette année' }
  ]

  const sortOptions = [
    { id: 'latest', name: 'Plus récent', icon: CalendarIcon },
    { id: 'popular', name: 'Plus populaire', icon: ArrowTrendingUpIcon },
    { id: 'trending', name: 'Tendances', icon: ArrowTrendingUpIcon },
    { id: 'alphabetical', name: 'Alphabétique', icon: TagIcon }
  ]

  const popularTags = [
    { name: 'BTP', count: 25 },
    { name: 'Innovation', count: 18 },
    { name: 'Durabilité', count: 15 },
    { name: 'Technologie', count: 12 },
    { name: 'Architecture', count: 10 },
    { name: 'Casablanca', count: 8 },
    { name: 'Marrakech', count: 6 },
    { name: 'Formation', count: 5 }
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedDateFilter !== 'all' || selectedSortBy !== 'latest' || searchTerm

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FunnelIcon className="h-5 w-5 mr-2 text-primary" />
              Filtrer les actualités
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Réinitialiser
              </Button>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Search Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher dans les articles..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-base">Catégories</CardTitle>
            {expandedSections.categories ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.categories && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Date Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('dateFilter')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-base flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Période
            </CardTitle>
            {expandedSections.dateFilter ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.dateFilter && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {dateFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onDateFilterChange(filter.id)}
                  className={`w-full p-2 rounded-lg text-left text-sm transition-colors ${
                    selectedDateFilter === filter.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Sort By */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('sortBy')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-base">Trier par</CardTitle>
            {expandedSections.sortBy ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.sortBy && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {sortOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.id}
                    onClick={() => onSortByChange(option.id)}
                    className={`w-full flex items-center p-2 rounded-lg text-left transition-colors ${
                      selectedSortBy === option.id
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{option.name}</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('tags')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-base flex items-center">
              <TagIcon className="h-4 w-4 mr-2" />
              Tags populaires
            </CardTitle>
            {expandedSections.tags ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.tags && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => onSearchChange(tag.name)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-primary/10 hover:text-primary rounded-full text-xs font-medium transition-colors"
                >
                  <span>{tag.name}</span>
                  <span className="text-gray-500">({tag.count})</span>
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="text-sm font-semibold text-primary mb-3">Filtres actifs</h4>
            <div className="space-y-2">
              {selectedCategory !== 'all' && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Catégorie:</span>
                  <Badge variant="secondary" className="text-xs">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </Badge>
                </div>
              )}
              {selectedDateFilter !== 'all' && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Période:</span>
                  <Badge variant="secondary" className="text-xs">
                    {dateFilters.find(d => d.id === selectedDateFilter)?.name}
                  </Badge>
                </div>
              )}
              {selectedSortBy !== 'latest' && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Tri:</span>
                  <Badge variant="secondary" className="text-xs">
                    {sortOptions.find(s => s.id === selectedSortBy)?.name}
                  </Badge>
                </div>
              )}
              {searchTerm && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Recherche:</span>
                  <Badge variant="secondary" className="text-xs">
                    "{searchTerm}"
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}