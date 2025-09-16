import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

export default function MessagePageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Retour</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Gérer les demandes de contact et messages</p>
        </div>
      </div>
    </div>
  )
}