import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusIcon, ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function EnhancedPageHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <HeaderContent />
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}

function HeaderContent() {
  return (
    <div className="flex items-center space-x-4">
      <BackButton />
      <HeaderTitle />
    </div>
  )
}

function BackButton() {
  return (
    <Link href="/admin">
      <Button variant="outline" size="sm" className="flex items-center space-x-2">
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Retour</span>
      </Button>
    </Link>
  )
}

function HeaderTitle() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <DocumentTextIcon className="w-8 h-8 mr-3 text-brand-blue" />
        Gestion des Articles
      </h1>
      <p className="text-gray-600 mt-1">Gérer le contenu éditorial et blog</p>
    </div>
  )
}

function HeaderActions() {
  return (
    <Link href="/admin/articles/new">
      <Button className="flex items-center space-x-2">
        <PlusIcon className="w-4 h-4" />
        <span>Nouvel Article</span>
      </Button>
    </Link>
  )
}

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des articles...</p>
      </div>
    </div>
  )
}

export function EmptyState({ 
  selectedStatus 
}: { 
  selectedStatus: string 
}) {
  return (
    <div className="text-center py-12">
      <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
      <p className="text-gray-600 mb-4">
        {selectedStatus === 'all' 
          ? "Aucun article n'a été créé pour le moment."
          : `Aucun article avec le statut "${selectedStatus}" trouvé.`
        }
      </p>
      <Link href="/admin/articles/new">
        <Button className="flex items-center space-x-2">
          <PlusIcon className="w-4 h-4" />
          <span>Créer le premier article</span>
        </Button>
      </Link>
    </div>
  )
}