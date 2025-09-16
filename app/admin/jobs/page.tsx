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
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  slug: string
  department: string | null
  location: string | null
  description: string | null
  published: boolean
}

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/admin/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      } else {
        console.error('Failed to fetch jobs')
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
      setJobs(jobs.filter(job => job.id !== id))
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Publiés</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {jobs.filter(j => j.published).length}
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
                    {jobs.filter(j => !j.published).length}
                  </p>
                </div>
                <PencilIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avec localisation</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {jobs.filter(j => j.location).length}
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.published 
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                            : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                        }`}>
                          {job.published ? 'Publié' : 'Brouillon'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {job.location && (
                          <>
                            <div className="flex items-center space-x-1">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <span>•</span>
                          </>
                        )}
                        {job.department && (
                          <>
                            <span>{job.department}</span>
                            <span>•</span>
                          </>
                        )}
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Créé le {new Date(job.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
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
