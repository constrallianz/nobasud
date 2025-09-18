interface ArticleFiltersProps {
  selectedStatus: string
  onStatusChange: (status: string) => void
  articleCount: number
}

export default function ArticleFilters({ 
  selectedStatus, 
  onStatusChange, 
  articleCount 
}: ArticleFiltersProps) {
  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'published', label: 'Publiés' },
    { key: 'draft', label: 'Brouillons' },
    { key: 'archived', label: 'Archivés' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <FilterButtons 
          filters={filters}
          selectedStatus={selectedStatus}
          onStatusChange={onStatusChange}
        />
        <ArticleCount count={articleCount} />
      </div>
    </div>
  )
}

function FilterButtons({ 
  filters, 
  selectedStatus, 
  onStatusChange 
}: {
  filters: Array<{ key: string; label: string }>
  selectedStatus: string
  onStatusChange: (status: string) => void
}) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">Filtrer par statut :</span>
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <FilterButton
            key={filter.key}
            filter={filter}
            isSelected={selectedStatus === filter.key}
            onClick={() => onStatusChange(filter.key)}
          />
        ))}
      </div>
    </div>
  )
}

function FilterButton({ 
  filter, 
  isSelected, 
  onClick 
}: {
  filter: { key: string; label: string }
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        isSelected
          ? 'bg-brand-blue text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {filter.label}
    </button>
  )
}

function ArticleCount({ count }: { count: number }) {
  return (
    <div className="text-sm text-gray-600">
      {count} article{count !== 1 ? 's' : ''} affiché{count !== 1 ? 's' : ''}
    </div>
  )
}