import { Button } from '@/components/ui/button'
import { Job } from '@/types/career'
import { 
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

interface JobCardProps {
  job: Job
  onView: (job: Job) => void
  handleEdit: (id: string) => void
  onDelete: (job: Job) => void
}

export function JobCard({ job, onView, handleEdit, onDelete }: JobCardProps) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <JobHeader job={job} />
          <JobMetadata job={job} />
          <JobTimestamp job={job} />
        </div>
        <JobActions 
          job={job}
          onView={onView}
          handleEdit={handleEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

function JobHeader({ job }: { readonly job: Job }) {
  return (
    <div className="flex items-center space-x-3 mb-2">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{job.title}</h3>
      <JobStatusBadge published={job.published} />
    </div>
  )
}

function JobStatusBadge({ published }: { readonly published: boolean }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      published 
        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
    }`}>
      {published ? 'Publié' : 'Brouillon'}
    </span>
  )
}

function JobMetadata({ job }: { readonly job: Job }) {
  return (
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
  )
}

function JobTimestamp({ job }: { readonly job: Job }) {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
      <div className="flex items-center space-x-1">
        <CalendarIcon className="w-4 h-4" />
        <span>Créé le {new Date(job.createdAt).toLocaleDateString('fr-FR')}</span>
      </div>
    </div>
  )
}

function JobActions({ 
  job, 
  onView, 
  handleEdit, 
  onDelete 
}: { 
  readonly job: Job
  readonly onView: (job: Job) => void
  readonly handleEdit: (id: string) => void
  readonly onDelete: (job: Job) => void
}) {
  return (
    <div className="flex items-center space-x-2">
     
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={() => handleEdit(job.id)}
      >
        <PencilIcon className="w-4 h-4" />
        <span>Modifier</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onDelete(job)}
        className="flex items-center space-x-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700"
      >
        <TrashIcon className="w-4 h-4" />
        <span>Supprimer</span>
      </Button>
    </div>
  )
}