import { useState, useMemo } from 'react'

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

interface StatusOption {
  value: string
  label: string
  count: number
}

export function useCandidatures() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in a real app, this would come from an API
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

  const statusOptions: StatusOption[] = useMemo(() => [
    { value: 'all', label: 'Tous les statuts', count: candidatures.length },
    { value: 'nouveau', label: 'Nouveau', count: candidatures.filter(c => c.status === 'nouveau').length },
    { value: 'vu', label: 'Vu', count: candidatures.filter(c => c.status === 'vu').length },
    { value: 'en_cours', label: 'En cours', count: candidatures.filter(c => c.status === 'en_cours').length },
    { value: 'retenu', label: 'Retenu', count: candidatures.filter(c => c.status === 'retenu').length },
    { value: 'refuse', label: 'Refusé', count: candidatures.filter(c => c.status === 'refuse').length }
  ], [candidatures])

  const filteredCandidatures = useMemo(() => {
    return candidatures.filter(candidature => {
      const matchesStatus = selectedStatus === 'all' || candidature.status === selectedStatus
      const matchesSearch = candidature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidature.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidature.position.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [candidatures, selectedStatus, searchTerm])

  const handleViewCV = (candidature: Candidature) => {
    // In a real app, this would open the CV or navigate to a CV viewer
    console.log('Viewing CV for:', candidature.name)
    window.open(candidature.cvUrl, '_blank')
  }

  const handleDelete = (candidature: Candidature) => {
    // In a real app, this would call an API to delete the candidature
    console.log('Deleting candidature:', candidature.name)
    // Show confirmation dialog and handle deletion
  }

  return {
    candidatures,
    filteredCandidatures,
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    statusOptions,
    handleViewCV,
    handleDelete
  }
}