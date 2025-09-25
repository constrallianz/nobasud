import { Statistic } from '@/types/realisations'
import { BuildingOffice2Icon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export const categories = ['Tous', 'Bâtiment', 'Voirie', 'Infrastructure', 'Travaux Publics', 'Assainissement']
export const stats: Statistic[] = [
  {
    value: '75+',
    label: 'Projets',
    sublabel: 'réalisés'
  },
  {
    value: '500M',
    label: 'MAD',
    sublabel: 'investis'
  },
  {
    value: '98%',
    label: 'Satisfaction',
    sublabel: 'client'
  },
  {
    value: '15+',
    label: 'Années',
    sublabel: 'd\'expérience'
  }
]

export const services = [
    {
      icon: BuildingOffice2Icon,
      title: 'Construction de bâtiments',
      description: 'Résidentiel, commercial, industriel - Du concept à la livraison'
    },
    {
      icon: TruckIcon,
      title: 'Infrastructure routière',
      description: 'Routes, autoroutes, ponts et ouvrages d\'art de qualité'
    },
    {
      icon: UserGroupIcon,
      title: 'Aménagement urbain',
      description: 'Espaces publics, parcs et zones d\'activité modernes'
    }
  ]

  export const statsMain = [
    { value: '500+', label: 'Projets réalisés' },
    { value: '15', label: 'Années d\'expérience' },
    { value: '200+', label: 'Collaborateurs' },
    { value: '98%', label: 'Clients satisfaits' }
  ]
