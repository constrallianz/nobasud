'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Job } from '@/types/career'
import { 
  MapPinIcon, 
  ClockIcon, 
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useJobs } from '../admin/jobs/jobs-listing/useJobs'

export default function JobListings() {
  const {jobs, loading}=useJobs();

  return (
    <section id="offres" className="py-24 bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Offres d&apos;<span className="text-brand-orange">emploi</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Découvrez nos opportunités actuelles et trouvez le poste qui correspond 
            à vos compétences et aspirations professionnelles.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des offres d&apos;emploi...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Aucune offre disponible pour le moment
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Consultez cette page régulièrement ou envoyez-nous une candidature spontanée.
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <div key={job.id} className="group bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-brand-orange/20">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-blue transition-colors">
                        {job.title}
                      </h3>
                      {job.department && (
                        <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm font-medium rounded-full">
                          {job.department}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {job.location && (
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                      )}
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        Publié le {new Date(job.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="mt-4 lg:mt-0 group">
                    Postuler
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {job.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
