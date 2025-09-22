interface Project {
  id: string
}

interface ProjectStatsProps {
  projects: Project[]
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="text-center">
        <span className="text-2xl font-bold text-brand-blue">
          {Array.isArray(projects) ? projects.length : 0}
        </span>
        <p className="text-gray-600">Projet(s) total</p>
      </div>
    </div>
  )
}