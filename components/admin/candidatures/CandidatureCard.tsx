import { 
  EyeIcon, 
  TrashIcon,
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

interface CandidatureCardProps {
  candidature: Candidature
  onViewCV: (candidature: Candidature) => void
  onDelete: (candidature: Candidature) => void
}

// Utility functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'nouveau': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case 'vu': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    case 'en_cours': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    case 'retenu': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case 'refuse': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
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

export function CandidatureCard({ candidature, onViewCV, onDelete }: CandidatureCardProps) {

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {candidature.name}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <CandidaturePosition position={candidature.position} />
              <CandidatureDate date={candidature.appliedAt} />
              <CandidatureStatus status={candidature.status} />
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <CandidatureContactInfo 
                email={candidature.email}
                phone={candidature.phone}
                experience={candidature.experience}
              />
            </div>
          </div>
        </div>
        <CandidatureActions 
          candidature={candidature}
          onViewCV={onViewCV}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

function CandidaturePosition({ position }: { readonly position: string }) {
  return (
    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
      <BriefcaseIcon className="w-4 h-4" />
      <span className="text-sm">{position}</span>
    </div>
  )
}

function CandidatureDate({ date }: { readonly date: string }) {
  return (
    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
      <CalendarIcon className="w-4 h-4" />
      <span className="text-sm">{formatDate(date)}</span>
    </div>
  )
}

function CandidatureStatus({ status }: { readonly status: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  )
}

function CandidatureContactInfo({ 
  email, 
  phone, 
  experience 
}: { 
  readonly email: string
  readonly phone: string
  readonly experience: string 
}) {
  return (
    <>
      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
        <EnvelopeIcon className="w-4 h-4" />
        <span>{email}</span>
      </div>
      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
        <PhoneIcon className="w-4 h-4" />
        <span>{phone}</span>
      </div>
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        Expérience: {experience}
      </div>
    </>
  )
}

function CandidatureActions({ 
  candidature, 
  onViewCV, 
  onDelete 
}: { 
  readonly candidature: Candidature
  readonly onViewCV: (candidature: Candidature) => void
  readonly onDelete: (candidature: Candidature) => void
}) {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-1"
        onClick={() => onViewCV(candidature)}
      >
        <EyeIcon className="w-4 h-4" />
        <span>Voir CV</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        onClick={() => onDelete(candidature)}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}