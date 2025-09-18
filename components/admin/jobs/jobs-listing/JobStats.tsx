import { 
  BriefcaseIcon,
  EyeIcon,
  PencilIcon
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

interface JobStatsProps {
  jobs: Job[]
}

export function JobStats({ jobs }: JobStatsProps) {
  const totalJobs = jobs.length
  const publishedJobs = jobs.filter(j => j.published).length
  const draftJobs = jobs.filter(j => !j.published).length
  const jobsWithLocation = jobs.filter(j => j.location).length

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <JobStatCard
        title="Total"
        value={totalJobs}
        icon={<BriefcaseIcon className="w-8 h-8 text-blue-500" />}
      />
      <JobStatCard
        title="Publiés"
        value={publishedJobs}
        icon={<EyeIcon className="w-8 h-8 text-green-500" />}
      />
      <JobStatCard
        title="Brouillons"
        value={draftJobs}
        icon={<PencilIcon className="w-8 h-8 text-orange-500" />}
      />
      <JobStatCard
        title="Avec localisation"
        value={jobsWithLocation}
        icon={<BriefcaseIcon className="w-8 h-8 text-purple-500" />}
      />
    </div>
  )
}

function JobStatCard({ 
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