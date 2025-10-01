'use client'

import { useState, useEffect } from 'react'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth')
      setIsAuthenticated(adminAuth === 'true')
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate server-side cookie
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
      console.error('Logout API call failed:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('authHeader')
      setIsAuthenticated(false)
      window.location.href = '/admin/login'
    }
  }

  return {
    isAuthenticated,
    isLoading,
    logout
  }
}
