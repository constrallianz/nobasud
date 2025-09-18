import { useState } from 'react'

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
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Données fictives des messages
  const messages: Message[] = [
    {
      id: '1',
      name: 'Hassan Benali',
      email: 'hassan.benali@email.com',
      phone: '+212 6 12 34 56 78',
      subject: 'Demande de devis pour construction villa',
      message: 'Bonjour, je souhaiterais obtenir un devis pour la construction d\'une villa de 200m² à Agadir. Pourriez-vous me contacter pour discuter des détails ?',
      submittedAt: '2024-01-15T10:30:00',
      status: 'nouveau',
      priority: 'haute',
      source: 'devis'
    },
    {
      id: '2',
      name: 'Amina El Fassi',
      email: 'amina.elfassi@email.com',
      phone: '+212 6 87 65 43 21',
      subject: 'Question sur vos services de rénovation',
      message: 'Je souhaite rénover mon appartement à Casablanca. Quels sont vos tarifs et délais habituels pour ce type de projet ?',
      submittedAt: '2024-01-14T14:15:00',
      status: 'lu',
      priority: 'normale',
      source: 'contact'
    },
    {
      id: '3',
      name: 'Omar Chraibi',
      email: 'omar.chraibi@societe.ma',
      phone: '+212 5 22 45 67 89',
      subject: 'Partenariat commercial',
      message: 'Notre société souhaite explorer des opportunités de partenariat avec NOBASUD. Pouvons-nous programmer une réunion ?',
      submittedAt: '2024-01-13T09:45:00',
      status: 'traite',
      priority: 'haute',
      source: 'autre'
    },
    {
      id: '4',
      name: 'Fatima Alaoui',
      email: 'fatima.alaoui@email.com',
      subject: 'Candidature spontanée',
      message: 'Ingénieure civile avec 5 ans d\'expérience, je souhaite rejoindre votre équipe. Vous trouverez mon CV en pièce jointe.',
      submittedAt: '2024-01-12T16:20:00',
      status: 'lu',
      priority: 'normale',
      source: 'carriere'
    },
    {
      id: '5',
      name: 'Ahmed Tazi',
      email: 'ahmed.tazi@email.com',
      phone: '+212 6 55 44 33 22',
      subject: 'URGENT - Problème chantier',
      message: 'Il y a un problème urgent sur le chantier du complexe commercial. Merci de me rappeler immédiatement.',
      submittedAt: '2024-01-11T08:30:00',
      status: 'traite',
      priority: 'urgente',
      source: 'autre'
    },
    {
      id: '6',
      name: 'Zineb Berrada',
      email: 'zineb.berrada@email.com',
      phone: '+212 6 77 66 55 44',
      subject: 'Remerciements pour le projet',
      message: 'Je tenais à vous remercier pour l\'excellent travail réalisé sur notre villa. Nous sommes très satisfaits du résultat.',
      submittedAt: '2024-01-10T12:00:00',
      status: 'archive',
      priority: 'faible',
      source: 'contact'
    }
  ]

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

  return {
    messages,
    filteredMessages,
    selectedStatus,
    selectedPriority,
    searchTerm,
    statusOptions,
    setSelectedStatus,
    setSelectedPriority,
    setSearchTerm,
    handleMarkAsRead,
    handleViewDetails,
    handleDelete
  }
}