import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AuthGuard from '@/components/AuthGuard'
import ThemeToggle from '@/components/ThemeToggle'
import { PlusIcon, ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

interface PageHeaderProps {
  articlesCount: number
}

export function PageHeader({ articlesCount }: PageHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Retour</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Gestion des Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gérez les articles et actualités du site ({articlesCount} articles)
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/admin/articles/new">
              <Button className="bg-brand-blue hover:bg-brand-blue/90 flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Nouvel article</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoadingState() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des articles...</p>
        </div>
      </div>
    </AuthGuard>
  )
}

export function ErrorState({ error }: { error: string }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <PageHeader articlesCount={0} />
        <div className="px-6 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
            <DocumentTextIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

export function EmptyState() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="text-center py-12">
        <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Aucun article trouvé
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Aucun article n'a été créé pour le moment.
        </p>
        <Link href="/admin/articles/new">
          <Button className="bg-brand-blue hover:bg-brand-blue/90 flex items-center space-x-2">
            <PlusIcon className="w-4 h-4" />
            <span>Créer le premier article</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function ArticlesList({ 
  children, 
  title = "Tous les articles" 
}: { 
  children: React.ReactNode
  title?: string 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </div>
    </div>
  )
}