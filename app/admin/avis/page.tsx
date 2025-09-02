'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  StarIcon as StarIconOutline,
  EyeIcon, 
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'

interface Avis {
  id: string
  name: string
  company?: string
  project: string
  rating: number
  comment: string
  submittedAt: string
  status: 'en_attente' | 'approuve' | 'rejete'
  email: string
}

export default function AvisPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Données fictives des avis
  const avis: Avis[] = [
    {
      id: '1',
      name: 'Mohammed Alami',
      company: 'Société ALAMI',
      project: 'Construction Villa Moderne - Agadir',
      rating: 5,
      comment: 'Travail exceptionnel ! L\'équipe de NOBASUD a livré notre villa dans les temps avec une qualité irréprochable. Nous recommandons vivement leurs services.',
      submittedAt: '2024-01-15',
      status: 'en_attente',
      email: 'mohammed.alami@email.com'
    },
    {
      id: '2',
      name: 'Fatima Benjelloun',
      company: '',
      project: 'Rénovation Appartement - Marrakech',
      rating: 4,
      comment: 'Très satisfaite du travail réalisé. L\'équipe était professionnelle et à l\'écoute de nos besoins. Quelques petits retards mais le résultat final est excellent.',
      submittedAt: '2024-01-14',
      status: 'approuve',
      email: 'fatima.benjelloun@email.com'
    },
    {
      id: '3',
      name: 'Ahmed Tazi',
      company: 'Groupe TAZI',
      project: 'Centre Commercial Atlas - Casablanca',
      rating: 5,
      comment: 'NOBASUD a géré notre projet de centre commercial avec un professionnalisme remarquable. Respect des délais, qualité exceptionnelle et suivi constant.',
      submittedAt: '2024-01-13',
      status: 'approuve',
      email: 'ahmed.tazi@email.com'
    },
    {
      id: '4',
      name: 'Zineb Chraibi',
      company: '',
      project: 'Construction Maison Traditionnelle - Fès',
      rating: 5,
      comment: 'Une expérience formidable avec NOBASUD. Ils ont su allier modernité et tradition dans notre projet. L\'équipe est compétente et très réactive.',
      submittedAt: '2024-01-12',
      status: 'approuve',
      email: 'zineb.chraibi@email.com'
    },
    {
      id: '5',
      name: 'Youssef El Mansouri',
      company: 'Société ELM',
      project: 'Complexe Industriel - Tanger',
      rating: 3,
      comment: 'Le travail était correct mais il y a eu quelques problèmes de communication pendant le projet. Le résultat final est satisfaisant mais pourrait être amélioré.',
      submittedAt: '2024-01-11',
      status: 'rejete',
      email: 'youssef.elmansouri@email.com'
    },
    {
      id: '6',
      name: 'Aicha Benali',
      company: '',
      project: 'Extension Villa - Rabat',
      rating: 5,
      comment: 'Équipe fantastique ! Ils ont transformé notre vision en réalité. Travail de haute qualité, respect du budget et des délais. Je les recommande sans hésitation.',
      submittedAt: '2024-01-10',
      status: 'approuve',
      email: 'aicha.benali@email.com'
    }
  ]

  const statusOptions = [
    { value: 'all', label: 'Tous les avis', count: avis.length },
    { value: 'en_attente', label: 'En attente', count: avis.filter(a => a.status === 'en_attente').length },
    { value: 'approuve', label: 'Approuvés', count: avis.filter(a => a.status === 'approuve').length },
    { value: 'rejete', label: 'Rejetés', count: avis.filter(a => a.status === 'rejete').length }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-800'
      case 'approuve': return 'bg-green-100 text-green-800'
      case 'rejete': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_attente': return 'En attente'
      case 'approuve': return 'Approuvé'
      case 'rejete': return 'Rejeté'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      i < rating ? (
        <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
      ) : (
        <StarIconOutline key={i} className="w-5 h-5 text-gray-300" />
      )
    ))
  }

  const filteredAvis = avis.filter(avisItem => {
    const matchesStatus = selectedStatus === 'all' || avisItem.status === selectedStatus
    const matchesSearch = avisItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         avisItem.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         avisItem.comment.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const averageRating = avis.reduce((sum, avisItem) => sum + avisItem.rating, 0) / avis.length

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
            <h1 className="text-3xl font-bold text-gray-900">Témoignages & Avis</h1>
            <p className="text-gray-600">Modérer les avis clients et témoignages</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note moyenne</p>
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800">
              <StarIconSolid className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        {statusOptions.slice(1).map((status) => (
          <div key={status.value} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{status.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{status.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${getStatusColor(status.value)}`}>
                <UserIcon className="w-6 h-6" />
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
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, projet ou commentaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent w-80"
            />
          </div>
        </div>
      </div>

      {/* Avis List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {filteredAvis.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredAvis.map((avisItem) => (
              <li key={avisItem.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{avisItem.name}</h3>
                          {avisItem.company && (
                            <span className="text-sm text-gray-500">({avisItem.company})</span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(avisItem.status)}`}>
                            {getStatusLabel(avisItem.status)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            {renderStars(avisItem.rating)}
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span className="text-sm">{formatDate(avisItem.submittedAt)}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Projet: {avisItem.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {avisItem.status === 'en_attente' && (
                        <>
                          <Button size="sm" className="flex items-center space-x-1 bg-green-600 hover:bg-green-700">
                            <CheckIcon className="w-4 h-4" />
                            <span>Approuver</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                            <XMarkIcon className="w-4 h-4" />
                            <span>Rejeter</span>
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p className="text-gray-700 leading-relaxed">{avisItem.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <StarIconOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis trouvé</h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? "Aucun avis n'a été soumis pour le moment."
                : `Aucun avis avec le statut "${statusOptions.find(s => s.value === selectedStatus)?.label}" trouvé.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
