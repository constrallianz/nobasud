import Image from 'next/image'
import Link from 'next/link'
import { 
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { FeaturedArticleProps } from '@/types/media'
import { FeaturedArticleSkeleton } from './MediaStates'
import { Button } from '../ui/button'

export default function FeaturedArticle({ 
  article, 
  loading, 
  getImageUrl, 
  getReadTime 
}: FeaturedArticleProps) {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
            Article à la une
          </h2>
        </div>

        {loading ? (
          <FeaturedArticleSkeleton />
        ) : article ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={getImageUrl(article)}
                  alt={article.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-orange text-white text-sm font-medium rounded-full">
                    À la une
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <TagIcon className="w-4 h-4 mr-1" />
                    Article
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {getReadTime(article.content)}
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                  {article.title}
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {article.excerpt || 'Découvrez cet article passionnant sur nos dernières actualités et innovations.'}
                </p>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Équipe NOBASUD</p>
                      <p className="text-sm text-gray-500">Rédaction</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link href={`/media/${article.slug}`}>
                    <Button size="lg" className="flex-1">
                      Lire l&apos;article
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">Aucun article à afficher pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
