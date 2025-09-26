import Image from 'next/image'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { RealisationsProjectsProps } from '@/types/realisations'
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export default function RealisationsProjects({ projects, categories }: RealisationsProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredProjects = selectedCategory === 'Tous'
    ? projects
    : projects.filter(project => project.type?.toLowerCase() === selectedCategory?.toLowerCase());

  // Import Button, Card, CardContent, Badge from your UI library
  // If not imported, add these imports at the top as needed
  // import { Button } from '@/components/ui/button';
  // import { Card, CardContent } from '@/components/ui/card';
  // import { Badge } from '@/components/ui/badge';

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`font-semibold ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {filteredProjects.map((project) => (
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
                  <p className="text-muted-foreground text-sm">{project.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Aucun projet trouvé dans cette catégorie.
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