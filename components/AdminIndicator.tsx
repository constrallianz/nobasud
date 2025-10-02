'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShieldCheckIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/button'

export default function AdminIndicator() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    setIsAdmin(adminAuth === 'true')
  }, [])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (token) {
        await fetch('/api/admin/auth', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('authHeader')
      setIsAdmin(false)
      window.location.reload()
    }
  }

  if (!isAdmin || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-4 max-w-sm">
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
            className=""
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <Link href="/admin">
            <Button 
              className="text-xs py-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Cog6ToothIcon className="w-4 h-4 mr-1" />
              Admin
            </Button>
          </Link>
          <Button 
            onClick={handleLogout}
            className="text-xs bg-transparent text-white border-white "
          >
            Déconnecter
          </Button>
        </div>
      </div>
    </div>
  )
}
