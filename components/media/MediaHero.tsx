
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, ClockIcon, TagIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Article } from '@/types/media'

interface MediaHeroProps {
  featuredArticle?: Article
  secondaryArticles?: Article[]
  loading?: boolean
}

export default function MediaHero({ featuredArticle, secondaryArticles = [], loading = false }: MediaHeroProps) {
  const formatDate = (date: Date | string) => {
    // Handle invalid dates
    if (!date) {
      return 'Date non disponible'
    }
    
    // Convert to Date object if it's a string
    const dateObj = new Date(date)
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Date non disponible'
    }
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dateObj)
  }

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Article Skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse"></div>
              <div className="mt-6 space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            
            {/* Secondary Articles Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-4">
                  <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          {featuredArticle ? (
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={featuredArticle.coverImageUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white border-0">
                      À LA UNE
                    </Badge>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        ACTUALITÉS
                      </Badge>
                    </div>
                    
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {featuredArticle.title}
                    </h1>
                    
                    <p className="text-lg text-gray-200 mb-6 line-clamp-2 leading-relaxed">
                      {featuredArticle.excerpt || 'Découvrez cet article passionnant sur nos dernières actualités.'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {formatDate(featuredArticle.publishedAt)}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          5 min de lecture
                        </div>
                      </div>
                      
                      <Link href={`/media/${featuredArticle.slug}`}>
                        <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                          Lire l'article
                          <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2">
              <div className="text-center py-20">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Actualités NOBASUD
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Découvrez les dernières nouvelles de nos projets, innovations et réalisations dans le secteur du BTP.
                </p>
              </div>
            </div>
          )}

          {/* Secondary Articles Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <TagIcon className="h-5 w-5 mr-2 text-primary" />
                Dernières actualités
              </h2>
              
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

            {/* Newsletter Signup */}
            <div className="bg-primary rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Newsletter NOBASUD</h3>
              <p className="text-sm text-primary-100 mb-4">
                Recevez nos dernières actualités directement dans votre boîte mail
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button variant="secondary" className="w-full bg-white hover:bg-gray-100 text-primary">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
