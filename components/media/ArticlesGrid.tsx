import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { ArticlesGridProps } from '@/types/media'
import { ArticlesGridSkeleton } from './MediaStates'

export default function ArticlesGrid({ 
  articles, 
  loading, 
  searchTerm,
  getImageUrl, 
  getReadTime 
}: ArticlesGridProps) {
  
  if (loading) {
    return <ArticlesGridSkeleton />
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Aucun article trouvé</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={getImageUrl(article)}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-2 py-1 bg-brand-blue text-white text-xs font-medium rounded-full">
                Article
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                {getReadTime(article.content)}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
              {article.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {article.excerpt || 'Découvrez cet article passionnant...'}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-brand-blue/10 rounded-full flex items-center justify-center">
                  <UserIcon className="w-3 h-3 text-brand-blue" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Équipe NOBASUD</span>
              </div>
              
              <Link href={`/media/${article.slug}`}>
                <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue/80">
                  Lire plus
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
