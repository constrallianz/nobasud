'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface NewsItem {
  id: string
  title: string
  href: string
  category: string
  isUrgent?: boolean
}

export default function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Mock breaking news data - in real app, this would come from API
  const breakingNews: NewsItem[] = [
    {
      id: '1',
      title: 'NOBASUD remporte le Grand Prix de l\'Innovation BTP 2024',
      href: '/media/grand-prix-innovation-btp-2024',
      category: 'PRIX',
      isUrgent: true
    },
    {
      id: '2', 
      title: 'Nouveau partenariat stratégique avec l\'Université Mohammed V',
      href: '/media/partenariat-universite-mohammed-v',
      category: 'PARTENARIAT'
    },
    {
      id: '3',
      title: 'Lancement du projet éco-quartier de Marrakech - 2000 logements',
      href: '/media/eco-quartier-marrakech',
      category: 'PROJET'
    }
  ]

  // Auto-advance ticker every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [breakingNews.length])

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingNews.length)
  }

  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length)
  }

  if (breakingNews.length === 0) return null

  const currentNews = breakingNews[currentIndex]

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* Breaking News Label */}
          <div className="flex-shrink-0 mr-4">
            <div className="flex items-center">
              <span className="bg-white text-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                {currentNews.isUrgent ? 'URGENT' : 'INFO'}
              </span>
              <span className="ml-3 text-sm font-semibold uppercase tracking-wider">
                {currentNews.category}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevNews}
            className="flex-shrink-0 p-1 hover:bg-red-700 rounded transition-colors mr-2"
            aria-label="Actualité précédente"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {/* Scrolling News Content */}
          <div className="flex-1 overflow-hidden">
            <Link 
              href={currentNews.href}
              className="block hover:underline"
            >
              <div className="animate-slide-left">
                <span className="text-sm font-medium">
                  {currentNews.title}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={nextNews}
            className="flex-shrink-0 p-1 hover:bg-red-700 rounded transition-colors ml-2"
            aria-label="Actualité suivante"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          {/* Indicators */}
          <div className="flex-shrink-0 ml-4 flex space-x-1">
            {breakingNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-red-400'
                }`}
                aria-label={`Aller à l'actualité ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}