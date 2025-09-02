import Image from 'next/image'
import { CalendarIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'

export default function RealisationsPage() {
  const projects = [
    {
      id: 1,
      name: 'Résidence Al Manar',
      type: 'Bâtiment',
      category: 'Résidentiel',
      location: 'Casablanca',
      year: '2024',
      status: 'Terminé',
      area: '15,000 m²',
      description: 'Complexe résidentiel haut de gamme de 120 appartements avec espaces verts, piscine et centre commercial.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      features: ['120 appartements', 'Espaces verts', 'Piscine', 'Centre commercial', 'Parking souterrain'],
      client: 'Groupe Immobilier Atlas'
    },
    {
      id: 2,
      name: 'Boulevard Mohammed VI',
      type: 'Voirie',
      category: 'Infrastructure',
      location: 'Marrakech',
      year: '2024',
      status: 'En cours',
      area: '5 km',
      description: 'Réaménagement complet du boulevard avec pistes cyclables, éclairage LED intelligent et espaces piétons.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      features: ['Pistes cyclables', 'Éclairage LED', 'Espaces piétons', 'Signalisation moderne', 'Végétalisation'],
      client: 'Commune Urbaine de Marrakech'
    },
    {
      id: 3,
      name: 'Parc Technologique Agadir',
      type: 'Aménagement',
      category: 'Zone d\'activité',
      location: 'Agadir',
      year: '2023',
      status: 'Terminé',
      area: '50 hectares',
      description: 'Zone d\'activité économique moderne avec infrastructures numériques et espaces de coworking.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      features: ['Fibre optique', 'Espaces coworking', 'Parking 500 places', 'Restaurant d\'entreprise', 'Sécurité 24h/7j'],
      client: 'Région Souss-Massa'
    },
    {
      id: 4,
      name: 'Centre Commercial Menara',
      type: 'Bâtiment',
      category: 'Commercial',
      location: 'Marrakech',
      year: '2023',
      status: 'Terminé',
      area: '25,000 m²',
      description: 'Centre commercial moderne avec 80 boutiques, cinéma et aire de restauration.',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop',
      features: ['80 boutiques', 'Cinéma 8 salles', 'Aire de restauration', 'Hypermarché', 'Terrasses extérieures'],
      client: 'Groupe Menara Retail'
    },
    {
      id: 5,
      name: 'Pont Hassan II',
      type: 'Voirie',
      category: 'Ouvrage d\'art',
      location: 'Casablanca',
      year: '2022',
      status: 'Terminé',
      area: '800 m',
      description: 'Pont à haubans enjambant l\'Oum Er-Rbia, facilitant la circulation entre les deux rives.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
      features: ['4 voies de circulation', 'Piste cyclable', 'Éclairage architectural', 'Structure métallique', 'Fondations profondes'],
      client: 'Ministère de l\'Équipement'
    },
    {
      id: 6,
      name: 'Parc Urbain Al Andalous',
      type: 'Aménagement',
      category: 'Espace vert',
      location: 'Rabat',
      year: '2022',
      status: 'Terminé',
      area: '12 hectares',
      description: 'Parc urbain avec jardins thématiques, aires de jeux et amphithéâtre en plein air.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
      features: ['Jardins thématiques', 'Aires de jeux', 'Amphithéâtre', 'Fontaines', 'Parcours sportif'],
      client: 'Préfecture de Rabat'
    }
  ]

  const categories = ['Tous', 'Bâtiment', 'Voirie', 'Aménagement']
  
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
            {projects.map((project, i) => (
              <div key={i} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Status badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Terminé' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-brand-orange text-white'
                  }`}>
                    {project.status}
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
                    <span className="text-sm font-medium text-brand-orange">{project.year}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <BuildingOffice2Icon className="w-4 h-4 mr-1" />
                      {project.area}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Caractéristiques principales :</div>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 dark:text-gray-400 rounded">
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="px-2 py-1 bg-brand-blue/10 text-xs text-brand-blue rounded">
                          +{project.features.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-xs text-gray-500">Client :</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.client}</div>
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
