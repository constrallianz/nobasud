import { RealisationsProjectsProps } from '@/types/realisations'
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export default function RealisationsProjects({ projects, categories }: RealisationsProjectsProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Projects Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <div 
                    className="h-64 bg-cover bg-center transition-transform group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                      {project.type}
                    </Badge>
                    <span className="text-muted-foreground text-sm font-medium">{project.createdAt ? new Date(project.createdAt).toLocaleDateString('fr-FR') : ''}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`project-name-${project.id}`}>
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{project.location}</p>
                  {project.description && (
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Aucun projet trouvé.
              </p>
            </div>
          )}

          {/* Load More Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
              Charger plus de projets
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}