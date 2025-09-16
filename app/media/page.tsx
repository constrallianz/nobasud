'use client'
import { useState, useEffect } from 'react'
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

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  coverImageUrl: string | null
  tags: string | null
  publishedAt: Date
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'Tous les articles', count: articles.length },
    { id: 'actualites', name: 'Actualités', count: articles.filter(a => a.tags?.includes('Actualités')).length },
    { id: 'projets', name: 'Nos projets', count: articles.filter(a => a.tags?.includes('Projets')).length },
    { id: 'innovation', name: 'Innovation', count: articles.filter(a => a.tags?.includes('Innovation')).length },
    { id: 'conseils', name: 'Conseils', count: articles.filter(a => a.tags?.includes('Conseils')).length }
  ]

  const featuredArticle = articles.length > 0 ? articles[0] : null

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || 
                           (article.tags && article.tags.includes(selectedCategory))
    return matchesSearch && matchesCategory
  }).slice(1) // Exclude featured article

  const getReadTime = (content: string | null) => {
    if (!content) return '3 min'
    const words = content.split(' ').length
    return `${Math.ceil(words / 200)} min`
  }

  const getImageUrl = (article: Article) => {
    return article.coverImageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }

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

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des articles...</p>
            </div>
          ) : featuredArticle ? (
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={getImageUrl(featuredArticle)}
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
                      Article
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {getReadTime(featuredArticle.content)}
                    </div>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {featuredArticle.excerpt || 'Découvrez cet article passionnant sur nos dernières actualités et innovations.'}
                  </p>

                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Équipe NOBASUD</p>
                        <p className="text-sm text-gray-500">Rédaction</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link href={`/media/${featuredArticle.slug}`}>
                      <Button size="lg" className="flex-1">
                        Lire l&apos;article
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
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
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400">Aucun article à afficher pour le moment.</p>
            </div>
          )}
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
                    src={getImageUrl(article)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-brand-blue text-white text-xs font-medium rounded-full">
                      Article
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {getReadTime(article.content)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt || 'Découvrez cet article passionnant...'}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-brand-blue/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Équipe NOBASUD</span>
                    </div>
                    
                    <Link href={`/media/${article.slug}`}>
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
