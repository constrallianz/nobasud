import { BuildingOffice2Icon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline'

  export const categories = ["Tous", "Résidentiel", "Infrastructure", "Commercial", "Industriel"];
// export const categories = ['Tous', 'Bâtiment', 'Voirie', 'Infrastructure', 'Travaux Publics', 'Assainissement']
export const projetRealise = [
                { 
                  title: "Bâtiments publics", 
                  count: "25+", 
                  description: "Écoles, centres administratifs, équipements sportifs" 
                },
                { 
                  title: "Logements", 
                  count: "40+", 
                  description: "Résidences collectives, logements sociaux, complexes touristiques" 
                },
                { 
                  title: "Infrastructures", 
                  count: "30+", 
                  description: "Routes, réseaux VRD, aménagements urbains" 
                },
                { 
                  title: "Industriel", 
                  count: "15+", 
                  description: "Entrepôts, zones industrielles, plateformes logistiques" 
                }
              ];
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
