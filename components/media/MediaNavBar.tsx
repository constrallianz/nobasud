'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface MediaNavBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function MediaNavBar({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange 
}: MediaNavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const categories = [
    { id: 'all', name: 'Toutes les actualités', href: '/media' },
    { id: 'projets', name: 'Nos Projets', href: '/media?category=projets' },
    { id: 'innovation', name: 'Innovation & BTP', href: '/media?category=innovation' },
    { id: 'partenariats', name: 'Partenariats', href: '/media?category=partenariats' },
    { id: 'environnement', name: 'Développement Durable', href: '/media?category=environnement' },
    { id: 'formation', name: 'Formation & Emploi', href: '/media?category=formation' },
    { id: 'recompenses', name: 'Prix & Récompenses', href: '/media?category=recompenses' }
  ]

  const quickLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Nos Métiers', href: '/nos-metiers' },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Carrières', href: '/carriere' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Quick Links Bar */}
        <div className="border-b border-gray-200 dark:border-gray-700 py-2">
          <div className="flex items-center justify-between">
            {/* <div className="hidden md:flex items-center space-x-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div> */}
            <div></div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-primary">
                NOBASUD
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                MÉDIAS & ACTUALITÉS
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  <span>Catégories</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg z-50">
                    <div className="py-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            onCategoryChange(category.id)
                            setIsCategoriesOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            selectedCategory === category.id ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des articles..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Subscribe Button */}
              <Button className="bg-primary hover:bg-primary/90 text-white">
                S'abonner
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              {/* Mobile Search */}
              <div className="mt-4 mb-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-1 mb-4">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Catégories</div>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id)
                      setIsMenuOpen(false)
                    }}
                    className={`w-full text-left py-2 px-3 rounded transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Mobile Quick Links */}
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for closing dropdown */}
      {isCategoriesOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsCategoriesOpen(false)}
        />
      )}
    </nav>
  )
}