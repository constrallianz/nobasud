'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AuthGuard from '@/components/AuthGuard'
import ThemeToggle from '@/components/ThemeToggle'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BriefcaseIcon,
  EyeIcon,
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

interface Job {
  id: number
  title: string
  department: string
  location: string
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance'
  level: 'Junior' | 'Senior' | 'Expert'
  description: string
  requirements: string[]
  status: 'active' | 'closed' | 'draft'
  createdAt: string
  updatedAt: string
  applications: number
}

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  // Données mockées pour la démonstration
  useEffect(() => {
    setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: "Ingénieur BTP Senior",
          department: "Ingénierie",
          location: "Casablanca",
          type: "CDI",
          level: "Senior",
          description: "Nous recherchons un ingénieur BTP expérimenté...",
          requirements: ["Diplôme d'ingénieur", "5+ ans d'expérience", "Maîtrise AutoCAD"],
          status: "active",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
          applications: 12
        },
        {
          id: 2,
          title: "Chef de projet infrastructure",
          department: "Management",
          location: "Marrakech",
          type: "CDI",
          level: "Expert",
          description: "Poste de chef de projet pour nos grands chantiers...",
          requirements: ["Master en génie civil", "10+ ans d'expérience", "Leadership"],
          status: "active",
          createdAt: "2024-01-10",
          updatedAt: "2024-01-12",
          applications: 8
        },
        {
          id: 3,
          title: "Stagiaire en architecture",
          department: "Architecture",
          location: "Agadir",
          type: "Stage",
          level: "Junior",
          description: "Stage de 6 mois en architecture...",
          requirements: ["Étudiant en architecture", "Créativité", "Logiciels 3D"],
          status: "draft",
          createdAt: "2024-01-05",
          updatedAt: "2024-01-08",
          applications: 0
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
      setJobs(jobs.filter(job => job.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
      case 'closed':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
      case 'draft':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'closed':
        return 'Fermé'
      case 'draft':
        return 'Brouillon'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement des offres d'emploi...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Retour</span>
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion des Emplois</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Gérez les offres d'emploi et candidatures</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/admin/jobs/new">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90 flex items-center space-x-2">
                    <PlusIcon className="w-4 h-4" />
                    <span>Nouvelle offre</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{jobs.length}</p>
                </div>
                <BriefcaseIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Actifs</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {jobs.filter(j => j.status === 'active').length}
                  </p>
                </div>
                <EyeIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Brouillons</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {jobs.filter(j => j.status === 'draft').length}
                  </p>
                </div>
                <PencilIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Candidatures</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {jobs.reduce((sum, job) => sum + job.applications, 0)}
                  </p>
                </div>
                <BriefcaseIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Liste des emplois */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Toutes les offres d'emploi</h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.map((job) => (
                <div key={job.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{job.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {getStatusText(job.status)}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <span>•</span>
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.level}</span>
                        <span>•</span>
                        <span>{job.applications} candidature{job.applications !== 1 ? 's' : ''}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Créé le {new Date(job.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>Voir</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <PencilIcon className="w-4 h-4" />
                        <span>Modifier</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span>Supprimer</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
