import Link from 'next/link'

interface ErrorStateProps {
  readonly error: string
  readonly backUrl?: string
  readonly backText?: string
}

export default function ErrorState({ 
  error, 
  backUrl = '/admin/articles',
  backText = 'Retour aux articles'
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Link
          href={backUrl}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {backText}
        </Link>
      </div>
    </div>
  )
}