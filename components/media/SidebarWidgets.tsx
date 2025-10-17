'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CalendarIcon, 
  ArrowRightIcon,

  NewspaperIcon,
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Article } from '@/types/media'

interface SidebarWidgetsProps {
  latestArticles?: Article[]
  popularArticles?: Article[]
}

export default function SidebarWidgets({ secondaryArticles=[] }: {secondaryArticles?: Article[]
}) {

  const formatDate = (date: Date | string) => {
    if (!date) {
      return 'Date invalide'
    }
    
    const dateObj = new Date(date)
    
    if (isNaN(dateObj.getTime())) {
      return 'Date invalide'
    }
    
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`
    }
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `Il y a ${diffInDays}j`
    }
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short'
    }).format(dateObj)
  }


  return (
    <div className="space-y-6">
     
      {/* Latest Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <NewspaperIcon className="h-5 w-5 mr-2 text-primary" />
            Derniers articles
          </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="bg-white dark:bg-gray-800 ">
              <div className="space-y-4">
                {secondaryArticles.length > 0 ? (
                  secondaryArticles.slice(0, 4).map((article, index) => (
                    <Link key={article.id} href={`/media/${article.slug}`} className="group block">
                      <div className="flex space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={article.coverImageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {article.title}
                          </h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatDate(article.publishedAt)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      Aucun article récent disponible
                    </p>
                  </div>
                )}
              </div>
              
              {secondaryArticles.length > 4 && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/media" className="text-primary hover:text-primary/80 font-medium text-sm flex items-center">
                    Voir tous les articles
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>

        </CardContent>
      </Card>

    
    </div>
  )
}