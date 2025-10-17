'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { 
  CalendarIcon, 
  EyeIcon, 
  ArrowRightIcon,
  ShareIcon,
  BookmarkIcon,
  NewspaperIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Article } from '@/types/media'
import { useNewsletterSubmit } from '@/hooks/useNewsletterSubmit'

interface SidebarWidgetsProps {
  latestArticles?: Article[]
  popularArticles?: Article[]
}

export default function SidebarWidgets({ latestArticles = [], popularArticles = [] }: SidebarWidgetsProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { submitNewsletter, isSubmitting } = useNewsletterSubmit()

  // Mock data if no props provided - creating minimal Article objects
  const mockLatestArticles = [
    {
      id: '1',
      title: 'Nouveau projet d\'éco-quartier à Marrakech',
      slug: 'eco-quartier-marrakech',
      publishedAt: new Date('2024-03-20')
    },
    {
      id: '2', 
      title: 'Innovation BTP : les nouvelles technologies',
      slug: 'innovation-btp-nouvelles-technologies',
      publishedAt: new Date('2024-03-18')
    },
    {
      id: '3',
      title: 'Partenariat avec l\'Université Mohammed V',
      slug: 'partenariat-universite-mohammed-v',
      publishedAt: new Date('2024-03-15')
    }
  ]

  const mockPopularArticles = [
    {
      id: '4',
      title: 'Grand Prix de l\'Innovation BTP 2024',
      slug: 'grand-prix-innovation-btp-2024',
      publishedAt: new Date('2024-03-10')
    },
    {
      id: '5',
      title: 'Les métiers du BTP de demain',
      slug: 'metiers-btp-demain',
      publishedAt: new Date('2024-03-08')
    }
  ]

  const displayLatest = latestArticles.length > 0 ? latestArticles : mockLatestArticles

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
          <div className="space-y-4">
            {displayLatest.slice(0, 4).map((article, index) => (
              <Link key={article.id} href={`/media/${article.slug}`} className="group block">
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="text-primary font-bold text-sm min-w-[24px]">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                     
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        
        </CardContent>
      </Card>

    
    </div>
  )
}