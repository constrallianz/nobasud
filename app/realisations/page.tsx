import { prisma } from '@/lib/prisma'
import { categories, stats } from '@/data/realisations'
import { ProjectWithImages } from '@/types/realisations'
import RealisationsHero from '@/components/realisations/RealisationsHero'
import RealisationsProjects from '@/components/realisations/RealisationsProjects'
import RealisationsStats from '@/components/realisations/RealisationsStats'

export default async function RealisationsPage() {
  // Fetch projects from database
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Parse images JSON for projects
  const projectsWithImages: ProjectWithImages[] = projects.map(project => ({
    ...project,
    images: project.images ? JSON.parse(project.images) : [],
    image: project.images ? JSON.parse(project.images)[0] : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }))
  
  return (
    <div className="relative">
      <RealisationsHero />
      <RealisationsProjects projects={projectsWithImages} categories={categories} />
      <RealisationsStats stats={stats} />
    </div>
  )
}
