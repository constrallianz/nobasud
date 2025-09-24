import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface AvisFormPageHeaderProps {
  readonly title: string
  readonly backUrl?: string
  readonly backText?: string
}

export default function AvisFormPageHeader({
  title,
  backUrl = '/admin/avis',
  backText = 'Retour aux avis'
}: AvisFormPageHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Link
            href={backUrl}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {backText}
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{title}</h1>
      </div>
    </div>
  )
}