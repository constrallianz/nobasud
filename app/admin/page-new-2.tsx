'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  ChartBarIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    articles: 0,
    jobs: 0,
    feedbacks: 0,
    contacts: 0,
    applications: 0
  })

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
      icon: UserGroupIcon,
      href: '/admin/applications',
      color: 'bg-orange-500',
      count: stats.applications
    },
    {
      title: 'Témoignages',
      description: 'Modérer les avis clients',
      icon: ChatBubbleLeftRightIcon,
      href: '/admin/feedbacks',
      color: 'bg-pink-500',
      count: stats.feedbacks
    },
    {
      title: 'Messages',
      description: 'Gérer les demandes de contact',
      icon: EnvelopeIcon,
      href: '/admin/contacts',
      color: 'bg-indigo-500',
      count: stats.contacts
    }
  ]

  const quickActions = [
    {
      title: 'Nouveau projet',
      href: '/admin/projects/new',
      icon: PlusIcon,
      color: 'bg-brand-blue'
    },
    {
      title: 'Nouvel article',
      href: '/admin/articles/new',
      icon: PlusIcon,
      color: 'bg-brand-orange'
    },
    {
      title: 'Nouvelle offre',
      href: '/admin/jobs/new',
      icon: PlusIcon,
      color: 'bg-purple-600'
    },
    {
      title: 'Voir le site',
      href: '/',
      icon: EyeIcon,
      color: 'bg-gray-600'
    }
  ]

  // Simulations de données (à remplacer par de vraies données)
  useEffect(() => {
    // Ici vous feriez des appels API pour récupérer les vraies statistiques
    setStats({
      projects: 12,
      articles: 8,
      jobs: 4,
      feedbacks: 23,
      contacts: 15,
      applications: 7
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
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
              <Button className="flex items-center space-x-2">
                <Cog6ToothIcon className="w-4 h-4" />
                <span>Paramètres</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques rapides */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vue d&apos;ensemble</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <ChartBarIcon className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Projets</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.projects}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <DocumentTextIcon className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Articles</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.articles}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <BriefcaseIcon className="w-8 h-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Emplois</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.jobs}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <UserGroupIcon className="w-8 h-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">CV reçus</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.applications}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-pink-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avis</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.feedbacks}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <EnvelopeIcon className="w-8 h-8 text-indigo-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.contacts}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions rapides */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => {
              const IconComponent = action.icon
              return (
                <Link key={i} href={action.href}>
                  <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{action.title}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Modules principaux */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Modules de gestion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, i) => {
              const IconComponent = module.icon
              return (
                <Link key={i} href={module.href}>
                  <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {module.count}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-brand-blue font-medium">
                      <span>Gérer</span>
                      <PencilIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Activité récente */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Activité récente</h2>
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BuildingOffice2Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Nouveau projet ajouté</p>
                      <p className="text-xs text-gray-500">Centre Commercial Atlas - Il y a 2 heures</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <DocumentTextIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Article publié</p>
                      <p className="text-xs text-gray-500">Innovation béton recyclé - Il y a 5 heures</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <UserGroupIcon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Nouvelle candidature</p>
                      <p className="text-xs text-gray-500">Ingénieur Travaux - Il y a 1 jour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
