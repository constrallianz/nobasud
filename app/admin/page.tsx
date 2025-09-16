'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AuthGuard from '@/components/AuthGuard'
import ThemeToggle from '@/components/ThemeToggle'
import { useEffect, useState } from 'react'
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

interface Stats {
  projects: number
  articles: number
  jobs: number
  applications: number
  feedbacks: number
  messages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    articles: 0,
    jobs: 0,
    applications: 0,
    feedbacks: 0,
    messages: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const responses = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/articles'),
        fetch('/api/admin/jobs'),
        fetch('/app/api/applications'),
        fetch('/app/api/feedback'),
        fetch('/app/api/contact')
      ])

      // For now, let's set some static values since we need to create these API endpoints
      setStats({
        projects: 5,
        articles: 3,
        jobs: 3,
        applications: 2,
        feedbacks: 3,
        messages: 2
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getModuleCount = (title: string): number => {
    switch (title) {
      case 'Réalisations': return stats.projects
      case 'Articles & Blog': return stats.articles
      case 'Offres d\'emploi': return stats.jobs
      case 'Candidatures': return stats.applications
      case 'Témoignages': return stats.feedbacks
      case 'Messages': return stats.messages
      default: return 0
    }
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
      color: 'bg-blue-500'
    },
    {
      title: 'Articles & Blog',
      description: 'Gérer le contenu éditorial',
      icon: DocumentTextIcon,
      href: '/admin/articles',
      color: 'bg-green-500'
    },
    {
      title: 'Offres d\'emploi',
      description: 'Gérer les postes et recrutement',
      icon: BriefcaseIcon,
      href: '/admin/jobs',
      color: 'bg-purple-500'
    },
    {
      title: 'Candidatures',
      description: 'Consulter les CV reçus',
      icon: DocumentIcon,
      href: '/admin/candidatures',
      color: 'bg-orange-500'
    },
    {
      title: 'Témoignages',
      description: 'Modérer les avis clients',
      icon: StarIcon,
      href: '/admin/avis',
      color: 'bg-yellow-500'
    },
    {
      title: 'Messages',
      description: 'Gérer les demandes de contact',
      icon: EnvelopeIcon,
      href: '/admin/messages',
      color: 'bg-red-500'
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  }

  return (
    <AuthGuard>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Administration NOBASUD</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Panneau de gestion du contenu</p>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Vue d'ensemble</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projets</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {loading ? '...' : stats.projects}
                  </p>
                </div>
                <BuildingOffice2Icon className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Articles</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {loading ? '...' : stats.articles}
                  </p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Emplois</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {loading ? '...' : stats.jobs}
                  </p>
                </div>
                <BriefcaseIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">CV reçus</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {loading ? '...' : stats.applications}
                  </p>
                </div>
                <DocumentIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avis</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {loading ? '...' : stats.feedbacks}
                  </p>
                </div>
                <StarIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Messages</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {loading ? '...' : stats.messages}
                  </p>
                </div>
                <EnvelopeIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Actions rapides</h2>
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Modules de gestion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link key={index} href={module.href}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${module.color} text-white`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {loading ? '...' : getModuleCount(module.title)}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{module.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{module.description}</p>
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
