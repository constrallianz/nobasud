import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  PlusIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

export default function ProjectPageHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Retour</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BuildingOffice2Icon className="w-8 h-8 mr-3 text-brand-blue" />
                Gestion des Projets
              </h1>
              <p className="text-gray-600 mt-1">Gérer les réalisations et projets en cours</p>
            </div>
          </div>
          <Link href="/admin/projects/new">
            <Button className="flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Nouveau Projet</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}