import Link from 'next/link'
import { ArrowLeftIcon, ExclamationTriangleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface PageHeaderProps {
  filteredCount: number
  searchTerm: string
}

export function PageHeader({ filteredCount, searchTerm }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Retour</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Avis</h1>
      </div>
      <div className="text-sm text-gray-600">
        {filteredCount} avis{filteredCount > 1 ? '' : ''} 
        {searchTerm && ` (filtrés sur "${searchTerm}")`}
      </div>
    </div>
  )
}

export function LoadingState() {
  return (
    <div className="space-y-8">
      <PageHeader filteredCount={0} searchTerm="" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des avis...</p>
      </div>
    </div>
  )
}

interface ErrorStateProps {
  error: string
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="space-y-8">
      <PageHeader filteredCount={0} searchTerm="" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
      </div>
    </div>
  )
}

interface EmptyStateProps {
  selectedZone: string
  zoneOptions: Array<{ value: string; label: string; count: number }>
}

export function EmptyState({ selectedZone, zoneOptions }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center py-12">
        <ChatBubbleBottomCenterTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis trouvé</h3>
        <p className="text-gray-600">
          {selectedZone === 'all' 
            ? "Aucun avis n'a été soumis pour le moment."
            : `Aucun avis trouvé pour la zone "${zoneOptions.find(z => z.value === selectedZone)?.label}".`
          }
        </p>
      </div>
    </div>
  )
}