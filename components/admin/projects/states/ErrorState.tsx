import Link from 'next/link'

interface ErrorStateProps {
  error: string
  backUrl?: string
  backText?: string
}

export default function ErrorState({ 
  error, 
  backUrl = '/admin/projects',
  backText = 'Retour aux projets'
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link
          href={backUrl}
          className="text-blue-600 hover:text-blue-800"
        >
          {backText}
        </Link>
      </div>
    </div>
  )
}