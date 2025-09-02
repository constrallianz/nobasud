'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'

interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  status: 'draft' | 'published' | 'archived'
  category: string
  featuredImage: string
  views: number
  comments: number
}

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Données de démonstration
  useEffect(() => {
    setTimeout(() => {
      setArticles([
        {
          id: 1,
          title: "L'innovation dans le béton recyclé",
          excerpt: "Découvrez comment NOBASUD révolutionne la construction avec des matériaux durables et écologiques.",
          content: "Le contenu complet de l'article...",
          author: "Mohamed Alaoui",
          publishedAt: "2024-01-15",
          status: "published",
          category: "Innovation",
          featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
          views: 1245,
          comments: 8
        },
        {
          id: 2,
          title: "Techniques modernes de construction parasismique",
          excerpt: "Les nouvelles normes de construction pour résister aux séismes au Maroc.",
          content: "Le contenu complet de l'article...",
          author: "Fatima Zahra",
          publishedAt: "2024-01-20",
          status: "published",
          category: "Technique",
          featuredImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
          views: 892,
          comments: 5
        },
        {
          id: 3,
          title: "Projet futur: Complexe touristique Agadir Bay",
          excerpt: "Aperçu du projet ambitieux de complexe touristique en cours de développement.",
          content: "Le contenu complet de l'article...",
          author: "Youssef Bennani",
          publishedAt: "2024-02-01",
          status: "draft",
          category: "Projets",
          featuredImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          views: 0,
          comments: 0
        }
      ])
      setLoading(false)
    }, 800)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <EyeIcon className="w-3 h-3 mr-1" />
            Publié
          </span>
        )
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <PencilIcon className="w-3 h-3 mr-1" />
            Brouillon
          </span>
        )
      case 'archived':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <EyeSlashIcon className="w-3 h-3 mr-1" />
            Archivé
          </span>
        )
      default:
        return null
    }
  }

  const filteredArticles = selectedStatus === 'all' 
    ? articles 
    : articles.filter(article => article.status === selectedStatus)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Retour</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <DocumentTextIcon className="w-8 h-8 mr-3 text-brand-blue" />
                  Gestion des Articles
                </h1>
                <p className="text-gray-600 mt-1">Gérer le contenu éditorial et blog</p>
              </div>
            </div>
            <Link href="/admin/articles/new">
              <Button className="flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Nouvel Article</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publiés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <PencilIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vues totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ChatBubbleLeftIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Commentaires</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.reduce((sum, a) => sum + a.comments, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filtrer par statut :</span>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'Tous' },
                  { key: 'published', label: 'Publiés' },
                  { key: 'draft', label: 'Brouillons' },
                  { key: 'archived', label: 'Archivés' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedStatus(filter.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedStatus === filter.key
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredArticles.length} article(s) affiché(s)
            </div>
          </div>
        </div>

        {/* Liste des articles */}
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="w-48 h-32 flex-shrink-0">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Contenu */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
                        {getStatusBadge(article.status)}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {article.views.toLocaleString()} vues
                        </div>
                        <div className="flex items-center">
                          <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                          {article.comments} commentaires
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>Voir</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <PencilIcon className="w-4 h-4" />
                        <span>Modifier</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                        <TrashIcon className="w-4 h-4" />
                        <span>Supprimer</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun article */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 mb-4">
              {selectedStatus === 'all' 
                ? "Aucun article n'a été créé pour le moment."
                : `Aucun article avec le statut "${selectedStatus}" trouvé.`
              }
            </p>
            <Link href="/admin/articles/new">
              <Button className="flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Créer le premier article</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
              <div>
                <h2 className="font-medium">{article.title}</h2>
                <div className="flex gap-2 mt-1">
                  <p className="text-sm text-gray-500">
                    Publié le {formatDate(article.publishedAt)}
                  </p>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${article.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {article.published ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/articles/${article.id}`}>
                  <Button variant="outline" size="sm">Modifier</Button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
