'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  const routes = [
    { 
      name: 'Entreprise', 
      href: '/a-propos',
      subItems: [
        { name: 'À propos', href: '/a-propos' },
        { name: 'Notre approche', href: '/notre-approche' },
        { name: 'Équipe', href: '/a-propos#equipe' }
      ]
    },
    { 
      name: 'Services', 
      href: '/realisations',
      subItems: [
        { name: 'Nos réalisations', href: '/realisations' },
        { name: 'Bâtiments', href: '/realisations?type=batiment' },
        { name: 'Infrastructure', href: '/realisations?type=infrastructure' },
        { name: 'Aménagement', href: '/realisations?type=amenagement' }
      ]
    },
    { 
      name: 'Ressources', 
      href: '/media',
      subItems: [
        { name: 'Blog & Actualités', href: '/media' },
        { name: 'Témoignages', href: '/feedback' },
        { name: 'Documentation', href: '/media?category=documentation' }
      ]
    },
    { 
      name: 'Carrières', 
      href: '/carriere'
    },
    { 
      name: 'Contact', 
      href: '/contact'
    }
  ]

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-20 h-20 rounded-xl flex items-center justify-center">
              <Image
                src="/logo-nobasud.png"
                alt="NOBASUD Logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {routes.map((route) => (
              <div key={route.name} className="relative">
                {route.subItems ? (
                  <div className="group">
                    <button
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-brand-orange rounded-lg hover:bg-gray-50",
                        pathname.startsWith(route.href) ? "text-brand-blue bg-blue-50" : "text-gray-700"
                      )}
                      onMouseEnter={() => setActiveDropdown(route.name)}
                    >
                      <span>{route.name}</span>
                      <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 backdrop-blur-sm">
                        {route.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-3 text-sm transition-colors hover:bg-gray-50 hover:text-brand-orange",
                              pathname === subItem.href ? "text-brand-blue bg-blue-50 font-medium" : "text-gray-700"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={route.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-brand-orange rounded-lg hover:bg-gray-50",
                      pathname === route.href ? "text-brand-blue bg-blue-50" : "text-gray-700"
                    )}
                  >
                    {route.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-brand-blue to-brand-orange hover:from-brand-blue/90 hover:to-brand-orange/90 text-white font-semibold px-6 py-2 shadow-lg">
                Devis gratuit
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {routes.map((route) => (
              <div key={route.name}>
                {route.subItems ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(route.name)}
                      className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>{route.name}</span>
                      <ChevronDownIcon 
                        className={cn(
                          "w-4 h-4 transition-transform",
                          activeDropdown === route.name ? "rotate-180" : ""
                        )} 
                      />
                    </button>
                    {activeDropdown === route.name && (
                      <div className="ml-4 mt-2 space-y-2">
                        {route.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-2 text-sm rounded-lg transition-colors",
                              pathname === subItem.href ? "text-brand-blue bg-blue-50 font-medium" : "text-gray-600 hover:text-brand-orange hover:bg-gray-50"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={route.href}
                    className={cn(
                      "block px-4 py-3 font-medium rounded-lg transition-colors",
                      pathname === route.href ? "text-brand-blue bg-blue-50" : "text-gray-700 hover:text-brand-orange hover:bg-gray-50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {route.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-brand-blue to-brand-orange text-white font-semibold">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
