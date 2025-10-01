import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  username: string
  password: string
}

export function useAdminLogin() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Send JSON data instead of FormData for JWT authentication
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store JWT token and user info
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        
        // Set Authorization header for future requests
        localStorage.setItem('authHeader', `Bearer ${data.token}`)
        
        // Redirect to admin dashboard
        router.push('/admin')
      } else {
        setError(data.error || 'Erreur de connexion')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Erreur de connexion au serveur')
    }
    
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return {
    formData,
    error,
    isLoading,
    handleSubmit,
    handleChange
  }
}