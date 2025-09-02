'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  EnvelopeIcon,
  EyeIcon, 
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

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

export default function MessagesPage() {
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

  const priorityOptions = [
    { value: 'all', label: 'Toutes priorités' },
    { value: 'urgente', label: 'Urgente' },
    { value: 'haute', label: 'Haute' },
    { value: 'normale', label: 'Normale' },
    { value: 'faible', label: 'Faible' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800'
      case 'lu': return 'bg-yellow-100 text-yellow-800'
      case 'traite': return 'bg-green-100 text-green-800'
      case 'archive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'bg-red-100 text-red-800'
      case 'haute': return 'bg-orange-100 text-orange-800'
      case 'normale': return 'bg-blue-100 text-blue-800'
      case 'faible': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nouveau': return 'Nouveau'
      case 'lu': return 'Lu'
      case 'traite': return 'Traité'
      case 'archive': return 'Archivé'
      default: return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'Urgente'
      case 'haute': return 'Haute'
      case 'normale': return 'Normale'
      case 'faible': return 'Faible'
      default: return priority
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'contact': return 'Contact'
      case 'devis': return 'Demande devis'
      case 'carriere': return 'Carrière'
      case 'autre': return 'Autre'
      default: return source
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredMessages = messages.filter(message => {
    const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || message.priority === selectedPriority
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Retour</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Gérer les demandes de contact et messages</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {statusOptions.slice(1).map((status) => (
          <div key={status.value} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{status.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{status.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${getStatusColor(status.value)}`}>
                <EnvelopeIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent w-80"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {filteredMessages.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <li key={message.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(message.status)}`}>
                            {getStatusLabel(message.status)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(message.priority)}`}>
                            {getPriorityLabel(message.priority)}
                          </span>
                          {message.priority === 'urgente' && (
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <EnvelopeIcon className="w-4 h-4" />
                            <span className="text-sm">{message.email}</span>
                          </div>
                          {message.phone && (
                            <div className="flex items-center space-x-1 text-gray-600">
                              <PhoneIcon className="w-4 h-4" />
                              <span className="text-sm">{message.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1 text-gray-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span className="text-sm">{formatDate(message.submittedAt)}</span>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {getSourceLabel(message.source)}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 mt-2">{message.subject}</h4>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {message.status === 'nouveau' && (
                        <Button size="sm" className="flex items-center space-x-1">
                          <CheckIcon className="w-4 h-4" />
                          <span>Marquer lu</span>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>Détails</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p className="text-gray-700 leading-relaxed">
                      {message.message.length > 200 
                        ? `${message.message.substring(0, 200)}...`
                        : message.message
                      }
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <EnvelopeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message trouvé</h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? "Aucun message n'a été reçu pour le moment."
                : `Aucun message avec le statut "${statusOptions.find(s => s.value === selectedStatus)?.label}" trouvé.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
