import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface StatusOption {
  value: string
  label: string
  count: number
}

interface CandidatureFiltersProps {
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusOptions: StatusOption[]
}

export function CandidatureFilters({
  selectedStatus,
  setSelectedStatus,
  searchTerm,
  setSearchTerm,
  statusOptions
}: CandidatureFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <StatusFilter 
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          statusOptions={statusOptions}
        />
        <SearchFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  )
}

function StatusFilter({
  selectedStatus,
  setSelectedStatus,
  statusOptions
}: {
  readonly selectedStatus: string
  readonly setSelectedStatus: (status: string) => void
  readonly statusOptions: StatusOption[]
}) {
  return (
    <div className="flex items-center space-x-4">
      <FunnelIcon className="w-5 h-5 text-gray-400" />
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.count})
          </option>
        ))}
      </select>
    </div>
  )
}

function SearchFilter({
  searchTerm,
  setSearchTerm
}: {
  readonly searchTerm: string
  readonly setSearchTerm: (term: string) => void
}) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Rechercher par nom, email ou poste..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent w-80 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
  )
}