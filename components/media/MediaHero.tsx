
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

export default function MediaHero({ featuredArticle, loading = false }: MediaHeroProps) {
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
            <div className="lg:col-span-3">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse"></div>
              <div className="mt-6 space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            
        
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          {featuredArticle ? (
            <div className="lg:col-span-3">
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
          </div>
        </div>
    </section>
  )
}
