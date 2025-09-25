'use client'

import { categories, stats } from '@/data/realisations'
import { ProjectWithImages } from '@/types/realisations'
import RealisationsHero from '@/components/realisations/RealisationsHero'
import RealisationsProjects from '@/components/realisations/RealisationsProjects'
import RealisationsStats from '@/components/realisations/RealisationsStats'
import { useProjects } from '@/components/admin/projects/listing'
import { LoadingState } from '@/components/admin/projects/states'

export default function RealisationsPage() {
    const {
       projects,
       loading,
     } = useProjects()
    
  const projectsWithImages: ProjectWithImages[] = projects.map(project => {
    const images = project.images ? JSON.parse(project.images) : [];
    const image = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    return {
      ...project,
      type: project.type as string,
      images,
      image
    };
  });

  
    if (loading) {
      return <LoadingState />
    }
  
  return (
    <div className="relative">
      <RealisationsHero />
      <RealisationsProjects projects={projectsWithImages} categories={categories} />
      <RealisationsStats stats={stats} />
    </div>
  )
}
