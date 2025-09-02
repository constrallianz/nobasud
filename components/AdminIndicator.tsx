'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShieldCheckIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

export default function AdminIndicator() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    setIsAdmin(adminAuth === 'true')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    setIsAdmin(false)
    window.location.reload()
  }

  if (!isAdmin || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-brand-blue text-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="w-6 h-6 text-brand-orange" />
            <div>
              <p className="font-semibold text-sm">Mode Admin Actif</p>
              <p className="text-xs opacity-90">Connecté en tant qu'administrateur</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <Link href="/admin">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-white text-brand-blue border-white hover:bg-gray-100"
            >
              <Cog6ToothIcon className="w-4 h-4 mr-1" />
              Admin
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="text-xs bg-transparent text-white border-white hover:bg-white/10"
          >
            Déconnecter
          </Button>
        </div>
      </div>
    </div>
  )
}
