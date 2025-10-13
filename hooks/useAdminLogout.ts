import { useState } from 'react'

interface UseAdminLogoutReturn {
  logout: () => Promise<void>
  isLoggingOut: boolean
}

export function useAdminLogout(): UseAdminLogoutReturn {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const logout = async () => {
    setIsLoggingOut(true)
    
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
      // Clear all auth data from localStorage
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('authHeader')
      
      setIsLoggingOut(false)
      
      // Reload the page to reset state
      window.location.reload()
    }
  }

  return {
    logout,
    isLoggingOut,
  }
}
