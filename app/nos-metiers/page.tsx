import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BuildingOffice2Icon, 
  CogIcon, 
  MapIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Expertises BTP | Construction, VRD, aménagements urbains – NOBASUD',
  description: 'NOBASUD intervient dans tous les métiers du BTP : gros œuvre, VRD, infrastructures et aménagements urbains. Découvrez notre approche opérationnelle et nos expertises.'
}

export default function NosMetiersPage() {
  const metiers = [
    {
      icon: BuildingOffice2Icon,
      title: 'Construction de bâtiments publics, résidentiels et industriels',
      description: 'Nous réalisons des projets de construction en gros œuvre et TCE (tout corps d\'état), pour le compte de collectivités, promoteurs, institutions ou industriels.',
      references: [
        'Hôtels, Écoles, centres de formation',
        'Logements collectifs et résidences sociales',
        'Entrepôts et bâtiments à usage industriel'
      ],
      savoirFaire: [
        'Maîtrise des normes techniques et réglementaires',
        'Pilotage de chantier multi-lots',
        'Coordination avec architectes et bureaux d\'études',
        'Finitions et livraisons clés en main'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: CogIcon,
      title: 'Infrastructures et réseaux structurants',
      description: 'NOBASUD intervient sur des projets stratégiques d\'infrastructures, en milieux urbains comme ruraux. Notre approche repose sur une ingénierie rigoureuse et une gestion optimisée des ressources.',
      references: [
        'Travaux de VRD (voirie, réseaux divers)',
        'Routes et plateformes logistiques',
        'Réseaux d\'assainissement, eau potable, drainage',
        'Petits ouvrages d\'art'
      ],
      savoirFaire: [
        'Maîtrise des délais et phasage opérationnel',
        'Conformité aux normes HSE et environnementales'
      ],
      image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: MapIcon,
      title: 'Valoriser l\'espace, structurer les villes',
      description: 'Nous accompagnons les collectivités dans leurs projets de requalification urbaine et d\'aménagements extérieurs durables. Qu\'il s\'agisse de créer un espace public ou de réaménager une voirie, nous intervenons avec une exigence de qualité et de cohérence territoriale.',
      references: [
        'Réseaux d\'éclairage public',
        'Mobilier urbain et plantations',
        'Trottoirs, places, pistes cyclables',
        'Signalétique et accessibilité'
      ],
      savoirFaire: [
        'Design urbain cohérent',
        'Respect de l\'identité territoriale',
        'Solutions durables et écologiques'
      ],
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Une offre globale, de la conception à la livraison',
      description: 'Pour vos projets intégrés, NOBASUD propose un accompagnement complet, de l\'étude initiale à la remise des clés. Nous mobilisons les meilleurs partenaires (architectes, BET, ingénieurs) pour une exécution fluide et cohérente.',
      references: [
        'Un interlocuteur unique',
        'Un suivi budgétaire transparent',
        'Un pilotage contractuel rigoureux',
        'Une livraison conforme aux attentes'
      ],
      savoirFaire: [
        'Gestion de projet intégrée',
        'Coordination multi-métiers',
        'Respect des engagements contractuels'
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
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
              Nos <span className="text-brand-orange">métiers</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
              NOBASUD intervient sur toute la chaîne de valeur du BTP, du gros œuvre à 
              l&apos;aménagement final des espaces. Nous mobilisons des équipes pluridisciplinaires 
              pour offrir des solutions complètes, performantes et adaptées aux spécificités 
              de chaque territoire.
            </p>
          </div>
        </div>
      </section>

      {/* Métiers sections */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="space-y-24">
            {metiers.map((metier, i) => {
              const IconComponent = metier.icon
              return (
                <div key={i} className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {i === 0 && 'Construction'}
                        {i === 1 && 'Génie civil & Infrastructures'}
                        {i === 2 && 'Aménagements urbains'}
                        {i === 3 && 'Projets clés en main'}
                      </h2>
                    </div>
                    
                    <h3 className="text-xl font-bold text-brand-blue mb-4">{metier.title}</h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      {metier.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4">
                          {i === 0 && 'Nos références incluent :'}
                          {i === 1 && 'Nous réalisons notamment :'}
                          {i === 2 && 'Nos expertises couvrent :'}
                          {i === 3 && 'Vous bénéficiez de :'}
                        </h4>
                        <ul className="space-y-2">
                          {metier.references.map((ref, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircleIcon className="w-5 h-5 text-brand-orange mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{ref}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-4">
                          {i === 0 && 'Nos savoir-faire :'}
                          {i === 1 && 'Atouts clés :'}
                          {i === 2 && 'Notre approche :'}
                          {i === 3 && 'Nos garanties :'}
                        </h4>
                        <ul className="space-y-2">
                          {metier.savoirFaire.map((savoir, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircleIcon className="w-5 h-5 text-brand-blue mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{savoir}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={metier.image}
                        alt={`Métier ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Besoin d&apos;un partenaire fiable pour vos <span className="text-brand-orange">chantiers</span> ?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/realisations">
                <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 px-8 py-4 text-lg">
                  Voir nos réalisations
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 text-lg">
                  Contactez notre équipe
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
