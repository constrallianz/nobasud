import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface ArticleFormPageHeaderProps {
  title: string
  backUrl?: string
  backText?: string
}

export default function ArticleFormPageHeader({
  title,
  backUrl = '/admin/articles',
  backText = 'Retour aux articles'
}: ArticleFormPageHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Link
            href={backUrl}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {backText}
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{title}</h1>
      </div>
    </div>
  )
}