import { 
  ClipboardDocumentListIcon,
  CogIcon, 
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { MethodologyPhase, CompanyValue, CaseStudy } from '@/types/approche'

export const methodology: MethodologyPhase[] = [
  {
    icon: ClipboardDocumentListIcon,
    title: 'Analyse & Conception',
    duration: '2-4 semaines',
    description: 'Étude approfondie de vos besoins, analyse du terrain et conception détaillée du projet.',
    steps: [
      'Étude de faisabilité technique et financière',
      'Analyse des contraintes réglementaires',
      'Conception architecturale et technique',
      'Validation du cahier des charges'
    ]
  },
  {
    icon: CogIcon,
    title: 'Planification',
    duration: '1-2 semaines',
    description: 'Organisation méthodique des ressources, planning détaillé et préparation des équipes.',
    steps: [
      'Planification des ressources humaines et matérielles',
      'Établissement du planning de réalisation',
      'Coordination avec les sous-traitants',
      'Mise en place des procédures qualité'
    ]
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Exécution',
    duration: 'Variable',
    description: 'Réalisation du projet avec un suivi quotidien et un contrôle qualité permanent.',
    steps: [
      'Mobilisation des équipes et matériels',
      'Exécution selon les standards NOBASUD',
      'Contrôle qualité à chaque étape',
      'Reporting régulier d\'avancement'
    ]
  },
  {
    icon: CheckCircleIcon,
    title: 'Livraison & SAV',
    duration: '1 semaine',
    description: 'Réception des travaux, formation et service après-vente pour votre satisfaction.',
    steps: [
      'Tests et vérifications finales',
      'Formation à l\'utilisation si nécessaire',
      'Remise des documents techniques',
      'Garantie et service après-vente'
    ]
  }
]

export const values: CompanyValue[] = [
  {
    icon: ShieldCheckIcon,
    title: 'Qualité & Sécurité',
    description: 'Nous appliquons les normes les plus strictes en matière de qualité et de sécurité sur tous nos chantiers.',
    benefits: [
      'Certification ISO 9001 & 45001',
      'Contrôle qualité à chaque étape',
      'Formation continue des équipes',
      'Zéro accident comme objectif'
    ]
  },
  {
    icon: LightBulbIcon,
    title: 'Innovation',
    description: 'Nous intégrons les dernières technologies et méthodes pour optimiser vos projets.',
    benefits: [
      'Techniques de construction modernes',
      'Matériaux écologiques et durables',
      'Digitalisation des processus',
      'R&D continue'
    ]
  },
  {
    icon: UsersIcon,
    title: 'Accompagnement',
    description: 'Un suivi personnalisé et une communication transparente tout au long du projet.',
    benefits: [
      'Chef de projet dédié',
      'Reporting hebdomadaire',
      'Disponibilité 24h/24',
      'Support après livraison'
    ]
  }
]

export const caseStudies: CaseStudy[] = [
  {
    title: 'Centre Commercial Atlas Mall',
    location: 'Casablanca',
    challenge: 'Construction d\'un centre commercial de 50 000 m² en zone urbaine dense',
    solution: 'Approche modulaire avec préfabrication pour réduire les nuisances',
    results: [
      'Livraison avec 2 mois d\'avance',
      'Réduction de 30% des nuisances sonores',
      '15% d\'économie sur le budget initial',
      'Certification environnementale HQE'
    ],
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Autoroute Marrakech-Ouarzazate',
    location: 'Région Sud',
    challenge: 'Traversée de zones montagneuses avec contraintes géologiques',
    solution: 'Études géotechniques approfondies et techniques spécialisées',
    results: [
      'Aucun dépassement de délai',
      'Résistance aux conditions extrêmes',
      'Impact environnemental minimal',
      'Création de 200 emplois locaux'
    ],
    image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]