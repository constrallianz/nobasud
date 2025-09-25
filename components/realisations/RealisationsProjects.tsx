import Image from 'next/image'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { RealisationsProjectsProps } from '@/types/realisations'
import { useState } from 'react';

export default function RealisationsProjects({ projects, categories }: RealisationsProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredProjects = selectedCategory === 'Tous'
    ? projects
    : projects.filter(project => project.type?.toLowerCase() === selectedCategory?.toLowerCase());

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${selectedCategory === category ? 'bg-brand-blue text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand-blue hover:text-white border-gray-200'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, i) => (
            <div key={project.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Status badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                  Réalisé
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-gray-800/90 text-gray-800">
                  {project.type}
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-blue transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-sm font-medium text-brand-orange">
                    {new Date(project.createdAt).getFullYear()}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {project.location || 'Non spécifié'}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {project.description || 'Description non disponible'}
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-xs text-gray-500">Catégorie :</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}