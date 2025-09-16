import Image from 'next/image'
import { CalendarIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'
import { prisma } from '@/lib/prisma'

export default async function RealisationsPage() {
  // Fetch projects from database
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Parse images JSON for projects
  const projectsWithImages = projects.map(project => ({
    ...project,
    images: project.images ? JSON.parse(project.images) : [],
    image: project.images ? JSON.parse(project.images)[0] : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }))

  const categories = ['Tous', 'Bâtiment', 'Infrastructure', 'Aménagement', 'Commercial']
  
  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nos <span className="text-brand-orange">réalisations</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Découvrez notre portfolio de projets emblématiques qui transforment 
              le paysage urbain du Maroc et témoignent de notre savoir-faire.
            </p>
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand-blue hover:text-white transition-all duration-300 border border-gray-200 font-medium"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsWithImages.map((project, i) => (
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
                      {project.location}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
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

      {/* Stats section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Nos <span className="text-brand-orange">performances</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Des chiffres qui témoignent de notre expertise et de notre engagement 
              pour la qualité dans chaque projet.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">75+</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Projets</div>
              <div className="text-gray-600 dark:text-gray-400">réalisés</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">500M</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">MAD</div>
              <div className="text-gray-600 dark:text-gray-400">investis</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Satisfaction</div>
              <div className="text-gray-600 dark:text-gray-400">client</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">15+</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Années</div>
              <div className="text-gray-600 dark:text-gray-400">d\'expérience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
