'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
 
interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken')
      const adminAuth = localStorage.getItem('adminAuth')
      
      if (token && adminAuth === 'true') {
        try {
          // Verify token by making a test API request
          const response = await fetch('/api/admin/verify', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            setIsAuthenticated(true)
          } else {
            // Token is invalid, clear storage and redirect
            localStorage.removeItem('adminToken')
            localStorage.removeItem('adminAuth')
            localStorage.removeItem('adminUser')
            localStorage.removeItem('authHeader')
            router.push('/admin/login')
          }
        } catch (error) {
          console.error('Auth verification failed:', error)
          // Clear storage and redirect on error
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminAuth')
          localStorage.removeItem('adminUser')
          localStorage.removeItem('authHeader')
          router.push('/admin/login')
        }
      } else {
        router.push('/admin/login')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
