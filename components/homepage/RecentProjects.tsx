import { SAMPLE_PROJECTS } from '@/lib/constants'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Building } from 'lucide-react'
import { useProjects } from '../admin/projects/listing'
import { ProjectWithImages } from '@/types/realisations'

const RecentProjects = () => {
   const { projects, loading } = useProjects();

  const projectsWithImages: ProjectWithImages[] = projects.map((project) => {
    const images = project.images ? JSON.parse(project.images) : [];
    const image =
      images.length > 0
        ? images[0]
        : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    return {
      ...project,
      type: project.type as string,
      images,
      image,
    };
  });

  return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2
                  className="text-4xl lg:text-5xl font-black text-primary mb-6"
                  data-testid="projects-title"
                >
                  Nos réalisations récentes
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Un portefeuille de réalisations à forte valeur structurante dans
                  les régions du Sud et au-delà.
                </p>
              </div>
    
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                {projectsWithImages.slice(0,3).map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    ></div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {project.type}
                        </span>
                        <span className="text-muted-foreground text-sm">
                           {new Date(project.createdAt).getFullYear()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {project.location}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
    
              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg"
                >
                  <Link href="/realisations" data-testid="button-view-all-projects">
                    <Building className="mr-2 h-5 w-5" />
                    Voir toutes nos réalisations
                  </Link>
                </Button>
              </div>
            </div>
          </section>
  )
}

export default RecentProjects