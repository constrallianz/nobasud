import { 
  BuildingOffice2Icon, 
  CogIcon, 
  MapIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'
import { Metier } from '@/types/metiers'

export const metiers: Metier[] = [
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
