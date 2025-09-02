'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ArrowRightIcon,
  EyeIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tous les articles', count: 24 },
    { id: 'actualites', name: 'Actualités', count: 8 },
    { id: 'projets', name: 'Nos projets', count: 6 },
    { id: 'innovation', name: 'Innovation', count: 4 },
    { id: 'conseils', name: 'Conseils', count: 6 }
  ]

  const featuredArticle = {
    id: 1,
    title: 'NOBASUD inaugure le plus grand complexe commercial du Sud Maroc',
    excerpt: 'Découvrez en exclusivité notre dernier projet : un complexe commercial de 75 000 m² qui redéfinit les standards du retail au Maroc.',
    content: 'Le nouveau complexe commercial Atlas Mall Agadir, réalisé par NOBASUD, ouvre ses portes après 18 mois de travaux. Ce projet d\'envergure...',
    author: 'Sarah Bennani',
    date: '2024-01-20',
    readTime: '5 min',
    category: 'Projets',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    views: 2847,
    featured: true
  }

  const articles = [
    {
      id: 2,
      title: 'Les nouvelles normes de construction durable au Maroc',
      excerpt: 'Analyse des dernières réglementations environnementales et leur impact sur le secteur du BTP.',
      author: 'Ahmed Fassi',
      date: '2024-01-18',
      readTime: '7 min',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 1523
    },
    {
      id: 3,
      title: 'Projet autoroutier Marrakech-Ouarzazate : défis et solutions',
      excerpt: 'Retour sur les défis techniques relevés lors de la construction de cette infrastructure majeure.',
      author: 'Omar El Alaoui',
      date: '2024-01-15',
      readTime: '6 min',
      category: 'Projets',
      image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 2156
    },
    {
      id: 4,
      title: 'Comment choisir les matériaux pour votre projet de construction',
      excerpt: 'Guide complet pour sélectionner les matériaux adaptés à votre projet selon le climat et l\'usage.',
      author: 'Fatima Zahra',
      date: '2024-01-12',
      readTime: '8 min',
      category: 'Conseils',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 3421
    },
    {
      id: 5,
      title: 'NOBASUD certifiée ISO 45001 pour la sécurité au travail',
      excerpt: 'Notre engagement pour la sécurité de nos équipes reconnu par cette certification internationale.',
      author: 'Hassan Benjelloun',
      date: '2024-01-10',
      readTime: '4 min',
      category: 'Actualités',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 1876
    },
    {
      id: 6,
      title: 'Innovation : NOBASUD teste le béton recyclé sur ses chantiers',
      excerpt: 'Première au Maroc : utilisation de béton recyclé pour réduire l\'empreinte carbone de nos constructions.',
      author: 'Laila Chraibi',
      date: '2024-01-08',
      readTime: '5 min',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 2634
    },
    {
      id: 7,
      title: 'Les étapes clés d\'un projet de rénovation réussi',
      excerpt: 'De la planification à la réception : notre méthodologie pour une rénovation sans stress.',
      author: 'Youssef Amrani',
      date: '2024-01-05',
      readTime: '6 min',
      category: 'Conseils',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 1945
    },
    {
      id: 8,
      title: 'Nouveau contrat : aménagement du technopole de Rabat',
      excerpt: 'NOBASUD remporte l\'appel d\'offres pour l\'aménagement d\'un technopole de nouvelle génération.',
      author: 'Khadija El Fassi',
      date: '2024-01-03',
      readTime: '3 min',
      category: 'Actualités',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 3156
    },
    {
      id: 9,
      title: 'Tendances architecture 2024 : le minimalisme durable',
      excerpt: 'Analyse des nouvelles tendances architecturales qui marqueront l\'année 2024 au Maroc.',
      author: 'Rachid Benali',
      date: '2024-01-01',
      readTime: '7 min',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 2789
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           article.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog & <span className="text-brand-orange">Actualités</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              Restez informé des dernières actualités, innovations et projets 
              de NOBASUD dans le secteur du BTP au Maroc.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-gray-900 dark:text-gray-100 text-lg"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-brand-blue text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Article <span className="text-brand-orange">à la une</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-orange text-white text-sm font-medium rounded-full">
                    À la une
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <TagIcon className="w-4 h-4 mr-1" />
                    {featuredArticle.category}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date(featuredArticle.date).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {featuredArticle.readTime}
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                  {featuredArticle.title}
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{featuredArticle.author}</p>
                      <p className="text-sm text-gray-500">Journaliste NOBASUD</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {featuredArticle.views.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button size="lg" className="flex-1">
                    Lire l&apos;article
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <ShareIcon className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <BookmarkIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Derniers <span className="text-brand-orange">articles</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Découvrez nos dernières publications sur l&apos;actualité du BTP, 
              nos projets et nos innovations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-brand-blue text-white text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {new Date(article.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      {article.views}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-brand-blue/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{article.author}</span>
                    </div>
                    
                    <Link href={`/blog/${article.id}`}>
                      <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue/80">
                        Lire plus
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Aucun article trouvé</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Charger plus d&apos;articles
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Restez <span className="text-brand-orange">informé</span>
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers articles 
              et actualités directement dans votre boîte email.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex space-x-4">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 text-gray-900 dark:text-gray-100"
                />
                <Button className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-6">
                  S&apos;abonner
                </Button>
              </div>
              <p className="text-sm opacity-75 mt-3">
                Pas de spam, désabonnement facile à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
