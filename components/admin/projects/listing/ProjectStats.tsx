import { 
  BuildingOffice2Icon,
  EyeIcon,
  PencilIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface Project {
  id: string
  name: string
  type: string
  location?: string | null
  description?: string | null
  images?: string | null
}

interface ProjectStatsProps {
  readonly projects: Project[]
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = Array.isArray(projects) ? projects.length : 0
  const projectsWithDescription = projects.filter(p => p.description).length
  const projectsWithImages = projects.filter(p => p.images).length
  const projectsWithLocation = projects.filter(p => p.location).length

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <ProjectStatCard
        title="Total"
        value={totalProjects}
        icon={<BuildingOffice2Icon className="w-8 h-8 text-blue-500" />}
      />
      <ProjectStatCard
        title="Avec description"
        value={projectsWithDescription}
        icon={<EyeIcon className="w-8 h-8 text-green-500" />}
      />
      <ProjectStatCard
        title="Avec images"
        value={projectsWithImages}
        icon={<PencilIcon className="w-8 h-8 text-orange-500" />}
      />
      <ProjectStatCard
        title="Avec localisation"
        value={projectsWithLocation}
        icon={<MapPinIcon className="w-8 h-8 text-purple-500" />}
      />
    </div>
  )
}

function ProjectStatCard({ 
  title, 
  value, 
  icon 
}: { 
  readonly title: string
  readonly value: number
  readonly icon: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  )
}