import { Button } from '@/components/ui/button'
import { 
  PencilIcon,
  TrashIcon,
  EyeIcon,
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

interface ProjectImageProps {
  project: Project
}

function ProjectImage({ project }: ProjectImageProps) {
  if (project.images) {
    return (
      <img
        src={JSON.parse(project.images)[0] || ''}
        alt={project.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg></div>'
        }}
      />
    )
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
      <BuildingOffice2Icon className="w-8 h-8" />
    </div>
  )
}

interface ProjectMetadataProps {
  project: Project
}

function ProjectMetadata({ project }: ProjectMetadataProps) {
  return (
    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
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
  )
}

interface ProjectActionsProps {
  project: Project
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

function ProjectActions({ project, onView, onEdit, onDelete }: ProjectActionsProps) {
  return (
    <div className="flex items-center space-x-2 ml-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={() => onView?.(project.id)}
      >
        <EyeIcon className="w-4 h-4" />
        <span>Voir</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={() => onEdit?.(project.id)}
      >
        <PencilIcon className="w-4 h-4" />
        <span>Modifier</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1 text-red-600 hover:text-red-700"
        onClick={() => onDelete?.(project.id)}
      >
        <TrashIcon className="w-4 h-4" />
        <span>Supprimer</span>
      </Button>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function ProjectCard({ 
  project, 
  onView, 
  onEdit, 
  onDelete 
}: ProjectCardProps) {
  const getStatusBadge = (type: string | null) => {
    if (!type) return null
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
        <BuildingOffice2Icon className="w-3 h-3 mr-1" />
        {type}
      </span>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex">
        {/* Image */}
        <div className="w-48 h-32 flex-shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <ProjectImage project={project} />
        </div>
        
        {/* Contenu */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
                {getStatusBadge(project.type)}
              </div>
              
              {project.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{project.description}</p>
              )}
              
              <ProjectMetadata project={project} />
            </div>
            
            {/* Actions */}
            <ProjectActions 
              project={project} 
              onView={onView} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}