import { useState, useEffect } from 'react'

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  submittedAt: string
  status: 'nouveau' | 'lu' | 'traite' | 'archive'
  priority: 'faible' | 'normale' | 'haute' | 'urgente'
  source: 'contact' | 'devis' | 'carriere' | 'autre'
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/admin/messages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.success) {
          setMessages(result.messages)
        } else {
          throw new Error(result.error || 'Failed to fetch messages')
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
        // Keep empty array on error
        setMessages([])
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const statusOptions = [
    { value: 'all', label: 'Tous les messages', count: messages.length },
    { value: 'nouveau', label: 'Nouveaux', count: messages.filter(m => m.status === 'nouveau').length },
    { value: 'lu', label: 'Lus', count: messages.filter(m => m.status === 'lu').length },
    { value: 'traite', label: 'Traités', count: messages.filter(m => m.status === 'traite').length },
    { value: 'archive', label: 'Archivés', count: messages.filter(m => m.status === 'archive').length }
  ]

  const filteredMessages = messages.filter(message => {
    const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || message.priority === selectedPriority
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  const handleMarkAsRead = (messageId: string) => {
    console.log('Marking message as read:', messageId)
    // Ici vous ajouteriez la logique pour marquer le message comme lu
  }

  const handleViewDetails = (messageId: string) => {
    console.log('Viewing message details:', messageId)
    // Ici vous ajouteriez la logique pour afficher les détails du message
  }

  const handleDelete = (messageId: string) => {
    console.log('Deleting message:', messageId)
    // Ici vous ajouteriez la logique pour supprimer le message
  }

  const refreshMessages = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/admin/messages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache' // Force fresh data
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        setMessages(result.messages)
      } else {
        throw new Error(result.error || 'Failed to refresh messages')
      }
    } catch (error) {
      console.error('Error refreshing messages:', error)
      setError(error instanceof Error ? error.message : 'Failed to refresh messages')
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    filteredMessages,
    loading,
    error,
    selectedStatus,
    selectedPriority,
    searchTerm,
    statusOptions,
    setSelectedStatus,
    setSelectedPriority,
    setSearchTerm,
    refreshMessages,
    handleMarkAsRead,
    handleViewDetails,
    handleDelete
  }
}