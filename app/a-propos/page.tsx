import { CheckBadgeIcon, UsersIcon, TrophyIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function AProposPage() {
  const values = [
    {
      icon: CheckBadgeIcon,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet, en respectant les plus hauts standards de qualité et en dépassant les attentes de nos clients.'
    },
    {
      icon: UsersIcon,
      title: 'Ancrage territorial',
      description: 'Profondément enracinés au Maroc, nous contribuons au développement économique et social des régions où nous intervenons.'
    },
    {
      icon: TrophyIcon,
      title: 'Innovation',
      description: 'Nous adoptons les dernières technologies et méthodes de construction pour offrir des solutions durables et efficaces.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Responsabilité',
      description: 'Nous nous engageons pour un développement durable, respectueux de l\'environnement et des communautés locales.'
    }
  ]

  const timeline = [
    {
      year: '2009',
      title: 'Création de NOBASUD',
      description: 'Fondation de l\'entreprise avec une vision claire : révolutionner le secteur du BTP au Sud du Maroc.'
    },
    {
      year: '2012',
      title: 'Premier grand projet',
      description: 'Réalisation du complexe résidentiel Al Manar à Casablanca, marquant notre entrée sur le marché du bâtiment.'
    },
    {
      year: '2016',
      title: 'Expansion régionale',
      description: 'Ouverture de bureaux à Marrakech et Agadir, consolidant notre présence dans le Sud du Maroc.'
    },
    {
      year: '2020',
      title: 'Certification ISO 9001',
      description: 'Obtention de la certification qualité, témoignant de notre engagement pour l\'excellence.'
    },
    {
      year: '2024',
      title: 'Leadership régional',
      description: 'NOBASUD devient l\'un des acteurs majeurs du BTP dans la région, avec plus de 75 projets réalisés.'
    }
  ]

  const team = [
    {
      name: 'Ahmed Benali',
      role: 'Directeur Général',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      description: '15 ans d\'expérience dans le BTP international'
    },
    {
      name: 'Fatima El Mansouri',
      role: 'Directrice Technique',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      description: 'Ingénieure civile, spécialiste en infrastructures'
    },
    {
      name: 'Youssef Alami',
      role: 'Directeur Commercial',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'Expert en développement commercial et partenariats'
    }
  ]

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 text-white overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <video 
          src="/animation.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              À propos de <span className="text-brand-orange">NOBASUD</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Depuis 2009, nous construisons l&apos;avenir du Maroc avec passion, 
              expertise et un engagement indéfectible pour l&apos;excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Notre <span className="text-brand-orange">histoire</span>
              </h2>
              <div className="prose prose-lg text-gray-600 dark:text-gray-400">
                <p className="mb-6">
                  NOBASUD naît en 2009 d&apos;une vision ambitieuse : transformer le paysage 
                  urbain du Sud du Maroc en alliant tradition architecturale et innovation 
                  technologique. Fondée par une équipe d&apos;ingénieurs passionnés, 
                  notre entreprise s&apos;est rapidement imposée comme un acteur incontournable 
                  du secteur du BTP.
                </p>
                <p className="mb-6">
                  Au fil des années, nous avons développé une expertise reconnue dans 
                  trois domaines clés : la construction de bâtiments résidentiels et 
                  commerciaux, le développement d&apos;infrastructures de transport, et 
                  l&apos;aménagement d&apos;espaces urbains durables.
                </p>
                <p>
                  Aujourd&apos;hui, NOBASUD emploie plus de 250 collaborateurs et a réalisé 
                  plus de 75 projets d&apos;envergure, contribuant activement au développement 
                  économique et social des régions où nous intervenons.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop" 
                alt="Notre histoire" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-orange text-white p-6 rounded-2xl">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Années d&apos;excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Nos <span className="text-brand-orange">valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ces principes fondamentaux guident chacune de nos actions et 
              définissent notre approche unique du secteur du BTP.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const IconComponent = value.icon
              return (
                <div key={i} className="group text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Notre <span className="text-brand-orange">parcours</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Retour sur les moments clés qui ont façonné l&apos;histoire de NOBASUD 
              et construit notre réputation d&apos;excellence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((event, i) => (
              <div key={i} className="relative flex items-center mb-12 last:mb-0">
                <div className="flex-shrink-0 w-32 text-right pr-8">
                  <div className="text-2xl font-bold text-brand-blue">{event.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-brand-orange rounded-full border-4 border-white shadow-lg relative z-10"></div>
                <div className="flex-1 ml-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                </div>
                {i < timeline.length - 1 && (
                  <div className="absolute left-[140px] top-6 w-0.5 h-16 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Notre <span className="text-brand-orange">équipe</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Rencontrez les leaders qui portent la vision de NOBASUD et 
              orchestrent notre succès au quotidien.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="group text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent rounded-2xl"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{member.name}</h3>
                <div className="text-brand-orange font-semibold mb-3">{member.role}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-orange text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">250+</div>
              <div className="text-white/90">Collaborateurs</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">75+</div>
              <div className="text-white/90">Projets réalisés</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">8</div>
              <div className="text-white/90">Régions couvertes</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">98%</div>
              <div className="text-white/90">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
