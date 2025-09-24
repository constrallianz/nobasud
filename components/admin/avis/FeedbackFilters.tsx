import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface ZoneOption {
  value: string
  label: string
  count: number
}

interface FeedbackFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedZone: string
  onZoneChange: (value: string) => void
  zoneOptions: ZoneOption[]
}

export default function FeedbackFilters({
  searchTerm,
  onSearchChange,
  selectedZone,
  onZoneChange,
  zoneOptions
}: FeedbackFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <ZoneFilter
            selectedZone={selectedZone}
            onZoneChange={onZoneChange}
            zoneOptions={zoneOptions}
          />
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  )
}

function ZoneFilter({ 
  selectedZone, 
  onZoneChange, 
  zoneOptions 
}: {
  selectedZone: string
  onZoneChange: (value: string) => void
  zoneOptions: ZoneOption[]
}) {
  return (
    <div className="flex items-center space-x-4">
      <FunnelIcon className="w-5 h-5 text-gray-400" />
      <select
        value={selectedZone}
        onChange={(e) => onZoneChange(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {zoneOptions.map((option) => (
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
  onSearchChange
}: {
  searchTerm: string
  onSearchChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Rechercher par nom, projet, entreprise ou message..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
      />
    </div>
  )
}