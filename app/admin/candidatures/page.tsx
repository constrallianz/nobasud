'use client'

import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { CandidatureCard } from '@/components/admin/candidatures/CandidatureCard'
import { CandidatureStats } from '@/components/admin/candidatures/CandidatureStats'
import { CandidatureFilters } from '@/components/admin/candidatures/CandidatureFilters'
import { CandidaturePageStates } from '@/components/admin/candidatures/CandidaturePageStates'
import { useCandidatures } from '@/components/admin/candidatures/useCandidatures'

export default function CandidaturesPage() {
  const {
    filteredCandidatures,
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    statusOptions,
    handleViewCV,
    handleDelete
  } = useCandidatures()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Retour</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Candidatures</h1>
            <p className="text-gray-600 dark:text-gray-400">Gérer les CV reçus et les candidatures</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <CandidatureStats statusOptions={statusOptions} />

      {/* Filters and Search */}
      <CandidatureFilters
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusOptions={statusOptions}
      />

      {/* Candidatures List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        {filteredCandidatures.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCandidatures.map((candidature) => (
              <li key={candidature.id}>
                <CandidatureCard
                  candidature={candidature}
                  onViewCV={handleViewCV}
                  onDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
        ) : (
          <CandidaturePageStates
            isEmpty={true}
            selectedStatus={selectedStatus}
            statusOptions={statusOptions}
          />
        )}
      </div>
    </div>
  )
}
