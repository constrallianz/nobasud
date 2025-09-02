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
  MapPinIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface Project {
  id: number
  title: string
  description: string
  location: string
  startDate: string
  endDate?: string
  status: 'en_cours' | 'termine' | 'planifie'
  category: string
  images: string[]
  budget?: number
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('tous')

  // Données de démonstration
  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          title: "Centre Commercial Atlas",
          description: "Construction d'un centre commercial moderne de 15,000 m²",
          location: "Agadir, Maroc",
          startDate: "2024-01-15",
          endDate: "2024-12-20",
          status: "en_cours",
          category: "Commercial",
          images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"],
          budget: 25000000
        },
        {
          id: 2,
          title: "Résidence Al Manar",
          description: "Complexe résidentiel de 120 appartements avec espaces verts",
          location: "Agadir, Maroc",
          startDate: "2023-06-01",
          endDate: "2024-02-28",
          status: "termine",
          category: "Résidentiel",
          images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
          budget: 18000000
        },
        {
          id: 3,
          title: "Pont Hassan II",
          description: "Rénovation complète du pont principal",
          location: "Agadir, Maroc",
          startDate: "2024-03-01",
          status: "planifie",
          category: "Infrastructure",
          images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_cours':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <ClockIcon className="w-3 h-3 mr-1" />
            En cours
          </span>
        )
      case 'termine':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="w-3 h-3 mr-1" />
            Terminé
          </span>
        )
      case 'planifie':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <CalendarIcon className="w-3 h-3 mr-1" />
            Planifié
          </span>
        )
      default:
        return null
    }
  }

  const filteredProjects = selectedStatus === 'tous' 
    ? projects 
    : projects.filter(project => project.status === selectedStatus)

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
        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filtrer par statut :</span>
              <div className="flex space-x-2">
                {[
                  { key: 'tous', label: 'Tous' },
                  { key: 'en_cours', label: 'En cours' },
                  { key: 'termine', label: 'Terminés' },
                  { key: 'planifie', label: 'Planifiés' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedStatus(filter.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedStatus === filter.key
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredProjects.length} projet(s) affiché(s)
            </div>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="w-48 h-32 flex-shrink-0">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Contenu */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                        {getStatusBadge(project.status)}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {project.location}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          Début: {new Date(project.startDate).toLocaleDateString('fr-FR')}
                        </div>
                        {project.endDate && (
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            Fin: {new Date(project.endDate).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>
                      
                      {project.budget && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-900">
                            Budget: {project.budget.toLocaleString()} MAD
                          </span>
                        </div>
                      )}
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
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <BuildingOffice2Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-600 mb-4">
              {selectedStatus === 'tous' 
                ? "Aucun projet n'a été créé pour le moment."
                : `Aucun projet avec le statut "${selectedStatus}" trouvé.`
              }
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
