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
      const submitData = new FormData()
      submitData.append('username', formData.username)
      submitData.append('password', formData.password)

      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        body: submitData
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Stocker la session admin
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        
        // Rediriger vers le dashboard admin
        router.push('/admin')
      } else {
        setError(data.error || 'Erreur de connexion')
      }
    } catch (error) {
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