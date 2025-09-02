'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  EyeIcon, 
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  CalendarIcon,
  BriefcaseIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface Candidature {
  id: string
  name: string
  email: string
  phone: string
  position: string
  appliedAt: string
  status: 'nouveau' | 'vu' | 'en_cours' | 'retenu' | 'refuse'
  cvUrl: string
  experience: string
}

export default function CandidaturesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Données fictives des candidatures
  const candidatures: Candidature[] = [
    {
      id: '1',
      name: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      phone: '+212 6 12 34 56 78',
      position: 'Ingénieur Civil',
      appliedAt: '2024-01-15',
      status: 'nouveau',
      cvUrl: '/cv/ahmed-benali.pdf',
      experience: '5 ans'
    },
    {
      id: '2',
      name: 'Fatima El Alami',
      email: 'fatima.elalami@email.com',
      phone: '+212 6 87 65 43 21',
      position: 'Architecte',
      appliedAt: '2024-01-14',
      status: 'en_cours',
      cvUrl: '/cv/fatima-elalami.pdf',
      experience: '8 ans'
    },
    {
      id: '3',
      name: 'Youssef Tadlaoui',
      email: 'youssef.tadlaoui@email.com',
      phone: '+212 6 55 44 33 22',
      position: 'Chef de chantier',
      appliedAt: '2024-01-13',
      status: 'retenu',
      cvUrl: '/cv/youssef-tadlaoui.pdf',
      experience: '12 ans'
    },
    {
      id: '4',
      name: 'Aicha Moussaoui',
      email: 'aicha.moussaoui@email.com',
      phone: '+212 6 11 22 33 44',
      position: 'Conductrice de travaux',
      appliedAt: '2024-01-12',
      status: 'vu',
      cvUrl: '/cv/aicha-moussaoui.pdf',
      experience: '3 ans'
    },
    {
      id: '5',
      name: 'Omar Lahlou',
      email: 'omar.lahlou@email.com',
      phone: '+212 6 99 88 77 66',
      position: 'Ingénieur Civil',
      appliedAt: '2024-01-11',
      status: 'refuse',
      cvUrl: '/cv/omar-lahlou.pdf',
      experience: '2 ans'
    },
    {
      id: '6',
      name: 'Khadija Berrada',
      email: 'khadija.berrada@email.com',
      phone: '+212 6 77 66 55 44',
      position: 'Architecte',
      appliedAt: '2024-01-10',
      status: 'nouveau',
      cvUrl: '/cv/khadija-berrada.pdf',
      experience: '6 ans'
    },
    {
      id: '7',
      name: 'Rachid Cherkaoui',
      email: 'rachid.cherkaoui@email.com',
      phone: '+212 6 33 44 55 66',
      position: 'Chef de chantier',
      appliedAt: '2024-01-09',
      status: 'en_cours',
      cvUrl: '/cv/rachid-cherkaoui.pdf',
      experience: '15 ans'
    }
  ]

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts', count: candidatures.length },
    { value: 'nouveau', label: 'Nouveau', count: candidatures.filter(c => c.status === 'nouveau').length },
    { value: 'vu', label: 'Vu', count: candidatures.filter(c => c.status === 'vu').length },
    { value: 'en_cours', label: 'En cours', count: candidatures.filter(c => c.status === 'en_cours').length },
    { value: 'retenu', label: 'Retenu', count: candidatures.filter(c => c.status === 'retenu').length },
    { value: 'refuse', label: 'Refusé', count: candidatures.filter(c => c.status === 'refuse').length }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800'
      case 'vu': return 'bg-gray-100 text-gray-800'
      case 'en_cours': return 'bg-yellow-100 text-yellow-800'
      case 'retenu': return 'bg-green-100 text-green-800'
      case 'refuse': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nouveau': return 'Nouveau'
      case 'vu': return 'Vu'
      case 'en_cours': return 'En cours'
      case 'retenu': return 'Retenu'
      case 'refuse': return 'Refusé'
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

  const filteredCandidatures = candidatures.filter(candidature => {
    const matchesStatus = selectedStatus === 'all' || candidature.status === selectedStatus
    const matchesSearch = candidature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidature.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidature.position.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
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
            <h1 className="text-3xl font-bold text-gray-900">Candidatures</h1>
            <p className="text-gray-600">Gérer les CV reçus et les candidatures</p>
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
                <DocumentTextIcon className="w-6 h-6" />
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
              placeholder="Rechercher par nom, email ou poste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent w-80"
            />
          </div>
        </div>
      </div>

      {/* Candidatures List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {filteredCandidatures.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredCandidatures.map((candidature) => (
              <li key={candidature.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{candidature.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <BriefcaseIcon className="w-4 h-4" />
                          <span className="text-sm">{candidature.position}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="text-sm">{formatDate(candidature.appliedAt)}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(candidature.status)}`}>
                          {getStatusLabel(candidature.status)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <EnvelopeIcon className="w-4 h-4" />
                          <span>{candidature.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <PhoneIcon className="w-4 h-4" />
                          <span>{candidature.phone}</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                          Expérience: {candidature.experience}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>Voir CV</span>
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune candidature trouvée</h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? "Aucune candidature n'a été reçue pour le moment."
                : `Aucune candidature avec le statut "${statusOptions.find(s => s.value === selectedStatus)?.label}" trouvée.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
