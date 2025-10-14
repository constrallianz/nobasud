import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  DocumentTextIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  PencilIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  DocumentIcon,
  StarIcon,
  MapPinIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface Stats {
  projects: number
  articles: number
  jobs: number
  applications: number
  feedbacks: number
  messages: number
}

interface Module {
  title: string
  description: string
  icon: any
  href: string
  color: string
}

interface AdminModulesProps {
  stats: Stats
  loading?: boolean
  variant?: 'default' | 'new' | 'new-2'
}

export default function AdminModules({ stats, loading = false, variant = 'default' }: AdminModulesProps) {
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

  const modules: Module[] = variant === 'default' ? [
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
    },
    {
      title: 'Statistiques',
      description: 'Gérer les chiffres clés',
      icon: ChartBarIcon,
      href: '/admin/statistics',
      color: 'bg-cyan-500'
    },
    {
      title: 'Emplacements',
      description: 'Gérer les bureaux et antennes',
      icon: MapPinIcon,
      href: '/admin/locations',
      color: 'bg-teal-500'
    }
  ] : [
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
      icon: UserGroupIcon,
      href: '/admin/applications',
      color: 'bg-orange-500'
    },
    {
      title: 'Témoignages',
      description: 'Modérer les avis clients',
      icon: ChatBubbleLeftRightIcon,
      href: '/admin/feedbacks',
      color: 'bg-pink-500'
    },
    {
      title: 'Messages',
      description: 'Gérer les demandes de contact',
      icon: EnvelopeIcon,
      href: '/admin/contacts',
      color: 'bg-indigo-500'
    }
  ]

  if (variant === 'new' || variant === 'new-2') {
    // Layout for page-new.tsx and page-new-2.tsx
    return (
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Modules de gestion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <Link key={module.title} href={module.href}>
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
                      {getModuleCount(module.title)}
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
    )
  }

  // Default layout for main page.tsx
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Modules de gestion</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link key={module.title} href={module.href}>
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
  )
}