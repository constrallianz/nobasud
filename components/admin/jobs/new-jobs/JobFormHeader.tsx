import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface JobFormHeaderProps {
  title: string
  subtitle: string
  backLink: string
  backLabel?: string
}

export function JobFormHeader({ 
  title, 
  subtitle, 
  backLink, 
  backLabel = "Retour" 
}: JobFormHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <Link href={backLink}>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{backLabel}</span>
        </Button>
      </Link>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}