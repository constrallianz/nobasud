import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  PlusIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Chargement des projets...</p>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <BuildingOffice2Icon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun projet trouvé</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Aucun projet n'a été créé pour le moment.
      </p>
      {/* <Link href="/admin/projects/new">
        <Button className="flex items-center space-x-2">
          <PlusIcon className="w-4 h-4" />
          <span>Créer le premier projet</span>
        </Button>
      </Link> */}
    </div>
  )
}

interface ProjectPageStatesProps {
  loading: boolean
  projects: any[]
}

export default function ProjectPageStates({ loading, projects }: ProjectPageStatesProps) {
  if (loading) {
    return <LoadingState />
  }

  if (Array.isArray(projects) && projects.length === 0) {
    return <EmptyState />
  }

  return null
}