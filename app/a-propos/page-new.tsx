import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  CheckCircleIcon, 
  HeartIcon, 
  MapPinIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  ArrowRightIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Qui sommes-nous | NOBASUD, expert marocain en construction & aménagement',
  description: 'Fondée en 2017, NOBASUD est une entreprise de construction marocaine qui s\'appuie sur l\'expérience de deux générations actives dans le BTP depuis les années 1970, alliant savoir-faire familial, expertise technique et ancrage territorial.'
}

export default function AProposPage() {
  const valeurs = [
    {
      icon: ShieldCheckIcon,
      title: 'Fiabilité',
      description: 'Nous respectons nos engagements en matière de délais, de coûts et de qualité d\'exécution.'
    },
    {
      icon: LightBulbIcon,
      title: 'Ambition',
      description: 'Nos collaborateurs sont notre matière première. Les qualités humaines, les relations, la parole donnée sont notre monnaie d\'échange.'
    },
    {
      icon: HandRaisedIcon,
      title: 'Engagement local',
      description: 'Nous travaillons avec et pour le territoire. Former, employer, développer localement fait partie de notre responsabilité.'
    }
  ]

  const chiffres = [
    { value: '150+', label: 'Chantiers livrés en 5 ans' },
    { value: '150', label: 'Collaborateurs mobilisés' },
    { value: '95%', label: 'Projets livrés dans les délais' },
    { value: '100%', label: 'Conformité HSE sur nos sites' }
  ]

  const zones = [
    'Agadir', 'Marrakech', 'Casablanca', 'Essaouira', 'Ouarzazate', 'Taroudant', 'Tiznit', 'Inezgane'
  ]

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              À propos de <span className="text-brand-orange">NOBASUD</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
              Acteur engagé du secteur BTP au Maroc, NOBASUD porte une vision ambitieuse : 
              bâtir des infrastructures pérennes qui améliorent la vie des citoyens et 
              accompagnent le développement des territoires.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mt-6 max-w-3xl mx-auto opacity-90">
              Notre approche repose sur l&apos;excellence opérationnelle, l&apos;engagement humain 
              et une profonde connaissance du terrain.
            </p>
          </div>
        </div>
      </section>

      {/* Notre identité */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Une entreprise familiale solidement ancrée dans son <span className="text-brand-orange">territoire</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    NOBASUD est née d&apos;un héritage entrepreneurial familial, porté par une passion 
                    pour le bâtiment, la terre, et la structuration du territoire. Forte d&apos;une histoire 
                    enracinée dans le sud du Maroc, l&apos;entreprise a grandi en conjuguant expertise 
                    technique, pragmatisme et proximité client.
                  </p>
                  <p>
                    Depuis sa création, NOBASUD s&apos;impose comme un partenaire de confiance pour 
                    les maîtres d&apos;ouvrage publics et privés, en s&apos;adaptant aux exigences des 
                    chantiers les plus complexes.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Équipe NOBASUD sur chantier"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-orange rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">2017</div>
                    <div className="text-sm">Fondation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nos <span className="text-brand-orange">engagements</span> structurent notre quotidien
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {valeurs.map((valeur, i) => {
              const IconComponent = valeur.icon
              return (
                <div key={i} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{valeur.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{valeur.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Notre <span className="text-brand-orange">Manifesto</span>
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-xl font-semibold">Nous sommes NOBASUD.</p>
              
              <p>
                Nous sommes issus d&apos;une terre, d&apos;une famille, et d&apos;un métier transmis, vécu, et respecté.
              </p>
              
              <p>
                Nous concevons chaque projet comme une réponse concrète aux besoins des collectivités, 
                des habitants et des territoires.
              </p>
              
              <p>
                À travers la rigueur, l&apos;expertise technique et la proximité terrain, nous accompagnons 
                nos clients sur l&apos;ensemble de la chaîne de valeur du BTP : gros œuvre, voirie, 
                aménagements urbains, VRD, gestion de projets clés en main.
              </p>
              
              <p>
                Nous proposons un service complet et intégré, de l&apos;étude à la livraison, pour garantir 
                la maîtrise des délais, des budgets et des standards de qualité.
              </p>
              
              <div className="bg-white/10 rounded-2xl p-8 my-8">
                <p className="text-xl font-semibold mb-4">
                  L&apos;authenticité est notre socle et la modernité est notre moteur.
                </p>
                <p>
                  Nous investissons dans les méthodes, les outils, les talents et les matériaux qui 
                  permettent à nos équipes de livrer des chantiers plus performants, plus sûrs, plus durables.
                </p>
              </div>
              
              <p>
                Satisfaire nos clients, tenir nos engagements, construire avec sérieux et respect : 
                voilà notre promesse.
              </p>
              
              <p className="text-xl font-bold">
                Nous sommes NOBASUD. Et nous construisons ce qui compte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Une croissance <span className="text-brand-orange">maîtrisée</span>, portée par le terrain
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
            {chiffres.map((chiffre, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-4">{chiffre.value}</div>
                <p className="text-gray-600 text-lg">{chiffre.label}</p>
              </div>
            ))}
          </div>

          {/* Carte du Maroc - Zones d'intervention */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Nos zones d&apos;intervention
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {zones.map((zone, i) => (
                <div key={i} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-5 h-5 text-brand-orange" />
                    <span className="font-medium text-gray-900">{zone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Vous souhaitez collaborer avec <span className="text-brand-orange">NOBASUD</span> ?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 px-8 py-4 text-lg">
                Nous contacter
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 text-lg">
                Voir nos réalisations
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
