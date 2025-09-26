'use client'
import { 
  ClockIcon, 
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useJobs } from '../admin/jobs/jobs-listing/useJobs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button';

export default function JobListings() {
  const {jobs, loading}=useJobs();
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
            Opportunités actuelles
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-blue mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Chargement des offres d'emploi...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Aucune offre disponible pour le moment
              </h3>
              <p className="text-muted-foreground">
                Consultez cette page régulièrement ou envoyez-nous une candidature spontanée.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <p className="text-muted-foreground">{job?.type} - {job.location}</p>
                      </div>
                      {job.department && (
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {job.description && (
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        Publié le {new Date(job.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Postuler pour ce poste
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Aucune offre ne correspond à votre profil ?<br />
              Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de nouveaux talents.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
