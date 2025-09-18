import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface QuickAction {
  title: string
  href: string
  icon: any
  color: string
}

interface QuickActionsProps {
  variant?: 'default' | 'new' | 'new-2'
}

export default function QuickActions({ variant = 'default' }: QuickActionsProps) {
  const quickActions: QuickAction[] = [
    {
      title: 'Nouveau projet',
      href: '/admin/projects/new',
      icon: PlusIcon,
      color: variant === 'default' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-brand-blue'
    },
    {
      title: 'Nouvel article',
      href: '/admin/articles/new',
      icon: PlusIcon,
      color: variant === 'default' ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-orange'
    },
    {
      title: 'Nouvelle offre',
      href: '/admin/jobs/new',
      icon: PlusIcon,
      color: variant === 'default' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600'
    },
    {
      title: 'Voir le site',
      href: '/',
      icon: EyeIcon,
      color: variant === 'default' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-600'
    }
  ]

  if (variant === 'new' || variant === 'new-2') {
    // Layout for page-new.tsx and page-new-2.tsx
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon
            return (
              <Link key={action.title} href={action.href}>
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
    )
  }

  // Default layout for main page.tsx
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Actions rapides</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
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
  )
}