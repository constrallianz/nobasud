'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface Project {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  slug: string
  type: string | null
  location: string | null
  description: string | null
  images: string | null
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          console.error('API returned non-array data:', data)
          setProjects([])
        }
      } else {
        console.error('Failed to fetch projects, status:', response.status)
        setProjects([])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (type: string | null) => {
    if (!type) return null
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <BuildingOffice2Icon className="w-3 h-3 mr-1" />
        {type}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des projets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Retour</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <BuildingOffice2Icon className="w-8 h-8 mr-3 text-brand-blue" />
                  Gestion des Projets
                </h1>
                <p className="text-gray-600 mt-1">Gérer les réalisations et projets en cours</p>
              </div>
            </div>
            <Link href="/admin/projects/new">
              <Button className="flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Nouveau Projet</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header info */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="text-center">
            <span className="text-2xl font-bold text-brand-blue">{Array.isArray(projects) ? projects.length : 0}</span>
            <p className="text-gray-600">Projet(s) total</p>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="space-y-6">
          {Array.isArray(projects) && projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="w-48 h-32 flex-shrink-0 bg-gray-200 flex items-center justify-center">
                  {project.images ? (
                    <img
                      src={JSON.parse(project.images)[0] || ''}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg></div>'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <BuildingOffice2Icon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                
                {/* Contenu */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                        {getStatusBadge(project.type)}
                      </div>
                      
                      {project.description && (
                        <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        {project.location && (
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            {project.location}
                          </div>
                        )}
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          Créé: {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          Modifié: {new Date(project.updatedAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>Voir</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <PencilIcon className="w-4 h-4" />
                        <span>Modifier</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                        <TrashIcon className="w-4 h-4" />
                        <span>Supprimer</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun projet */}
        {Array.isArray(projects) && projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <BuildingOffice2Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-600 mb-4">
              Aucun projet n'a été créé pour le moment.
            </p>
            <Link href="/admin/projects/new">
              <Button className="flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Créer le premier projet</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
