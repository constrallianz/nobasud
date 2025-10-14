

export const NAVIGATION_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Notre approche", href: "/notre-approche" },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Carrières", href: "/carriere" },
  { label: "Médias", href: "/media" },
  { label: "Contact", href: "/contact" }
];

// Company values for homepage
export const COMPANY_VALUES = [
  {
    icon: "handshake",
    title: "Excellence opérationnelle",
    description: "Notre approche repose sur l'excellence opérationnelle, l'engagement humain et une profonde connaissance du terrain."
  },
  {
    icon: "rocket", 
    title: "Innovation et performance",
    description: "Nous adoptons les dernières technologies et méthodes pour offrir des solutions durables et efficaces."
  },
  {
    icon: "map-marker-alt",
    title: "Ancrage territorial",
    description: "Profondément enracinés au Sud du Maroc, nous contribuons au développement économique et social de nos régions."
  }
];

// Services for homepage
export const SERVICES = [
  {
    title: "Bâtiment",
    subtitle: "Construction et réhabilitation",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    features: [
      "Logements collectifs et individuels",
      "Bâtiments commerciaux et industriels",
      "Équipements publics et privés",
      "Réhabilitation et rénovation"
    ]
  },
  {
    title: "Infrastructure",
    subtitle: "Travaux publics et aménagement",
    image: "https://images.unsplash.com/photo-1558618666-fbd31c41e7d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    features: [
      "Routes et autoroutes",
      "Ponts et ouvrages d'art",
      "Réseaux d'assainissement",
      "Aménagements urbains et paysagers"
    ]
  }
];

// Key numbers for homepage
export const KEY_NUMBERS = [
  { value: "15+", label: "Projets réalisés" },
  { value: "500M", label: "MAD investis" },
  { value: "98%", label: "Satisfaction client" },
  { value: "15+", label: "Années d'expérience" }
];

// Sample projects for homepage display
export const SAMPLE_PROJECTS = [
  {
    id: "1",
    name: "Centre Commercial Atlas",
    type: "Commercial",
    location: "Agadir, Maroc",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "2",
    name: "Résidence Les Jardins",
    type: "Résidentiel",
    location: "Marrakech, Maroc",
    year: "2023",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "3",
    name: "Autoroute A7 - Extension",
    type: "Infrastructure",
    location: "Casablanca-Marrakech",
    year: "2023",
    image: "https://images.unsplash.com/photo-1558618666-fbd31c41e7d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];