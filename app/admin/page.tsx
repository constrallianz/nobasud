'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AuthGuard from '@/components/AuthGuard'
import { 
  DocumentTextIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  Cog6ToothIcon,
  EyeIcon,
  PlusIcon,
  StarIcon,
  DocumentIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const stats = {
    projects: 12,
    articles: 8,
    jobs: 4,
    cvs: 7,
    avis: 23,
    messages: 15
  }

  // Actions rapides
  const quickActions = [
    {
      title: 'Nouveau projet',
      icon: PlusIcon,
      href: '/admin/projects/new',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Nouvel article',
      icon: PlusIcon,
      href: '/admin/articles/new',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Nouvelle offre',
      icon: PlusIcon,
      href: '/admin/jobs/new',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Voir le site',
      icon: EyeIcon,
      href: '/',
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ]

  // Modules d'administration
  const modules = [
    {
      title: 'Réalisations',
      description: 'Gérer les projets et réalisations',
      icon: BuildingOffice2Icon,
      href: '/admin/projects',
      color: 'bg-blue-500',
      count: stats.projects
    },
    {
      title: 'Articles & Blog',
      description: 'Gérer le contenu éditorial',
      icon: DocumentTextIcon,
      href: '/admin/articles',
      color: 'bg-green-500',
      count: stats.articles
    },
    {
      title: 'Offres d\'emploi',
      description: 'Gérer les postes et recrutement',
      icon: BriefcaseIcon,
      href: '/admin/jobs',
      color: 'bg-purple-500',
      count: stats.jobs
    },
    {
      title: 'Candidatures',
      description: 'Consulter les CV reçus',
      icon: DocumentIcon,
      href: '/admin/candidatures',
      color: 'bg-orange-500',
      count: stats.cvs
    },
    {
      title: 'Témoignages',
      description: 'Modérer les avis clients',
      icon: StarIcon,
      href: '/admin/avis',
      color: 'bg-yellow-500',
      count: stats.avis
    },
    {
      title: 'Messages',
      description: 'Gérer les demandes de contact',
      icon: EnvelopeIcon,
      href: '/admin/messages',
      color: 'bg-red-500',
      count: stats.messages
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  }

  return (
    <AuthGuard>
      <div className="bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Administration NOBASUD</h1>
                <p className="text-gray-600 mt-1">Panneau de gestion du contenu</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <EyeIcon className="w-4 h-4" />
                    <span>Voir le site</span>
                  </Button>
                </Link>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Cog6ToothIcon className="w-4 h-4" />
                  <span>Paramètres</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-2 pb-8">
        {/* Vue d'ensemble */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Vue d'ensemble</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Projets</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.projects}</p>
                </div>
                <BuildingOffice2Icon className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Articles</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.articles}</p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Emplois</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.jobs}</p>
                </div>
                <BriefcaseIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CV reçus</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.cvs}</p>
                </div>
                <DocumentIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avis</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.avis}</p>
                </div>
                <StarIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.messages}</p>
                </div>
                <EnvelopeIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Button 
                  className={`w-full h-24 flex flex-col items-center justify-center space-y-2 text-white ${action.color}`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{action.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Modules de gestion */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Modules de gestion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link key={index} href={module.href}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${module.color} text-white`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">{module.count}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Gérer
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}