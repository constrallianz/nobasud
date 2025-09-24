'use client'

import AuthGuard from '@/components/AuthGuard'
import ProjectPageHeader from '@/components/admin/projects/listing/ProjectPageHeader'
import ProjectStats from '@/components/admin/projects/listing/ProjectStats'
import ProjectCard from '@/components/admin/projects/listing/ProjectCard'
import ProjectPageStates from '@/components/admin/projects/listing/ProjectPageStates'
import { useProjects } from '@/components/admin/projects/listing/useProjects'

export default function ProjectsAdmin() {
  const {
    projects,
    loading,
    handleView,
    handleEdit,
    handleDelete
  } = useProjects()

  // Handle full page loading state
  if (loading) {
    return (
      <AuthGuard>
        <ProjectPageStates loading={loading} projects={projects} />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ProjectPageHeader totalProjects={Array.isArray(projects) ? projects.length : 0} />

        <div className="container mx-auto px-4 py-8">
          <ProjectStats projects={projects} />

          {/* Liste des projets */}
          <div className="space-y-6">
            {Array.isArray(projects) && projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Empty state */}
          {Array.isArray(projects) && projects.length === 0 && (
            <ProjectPageStates loading={loading} projects={projects} />
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
