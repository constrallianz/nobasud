import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import { 
  Cog6ToothIcon,
  EyeIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

interface DashboardHeaderProps {
  variant?: 'default' | 'new' | 'new-2'
  onLogout?: () => void
}

export default function DashboardHeader({ variant = 'default', onLogout }: DashboardHeaderProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminUser')
      window.location.href = '/admin/login'
    }
  }

  if (variant === 'new' || variant === 'new-2') {
    // Header for page-new.tsx and page-new-2.tsx
    return (
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
    )
  }

  // Default header for main page.tsx
  return (
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
  )
}