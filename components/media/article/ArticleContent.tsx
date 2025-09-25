'use client'

import { Article } from '@prisma/client'

interface ArticleContentProps {
  article: Article
  readTime: number
}

export default function ArticleContent({ article, readTime }: ArticleContentProps) {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Article Meta Info */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Publié le {new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
              <span>•</span>
              <span>{readTime} min de lecture</span>
            </div>
            
            {/* Social Share Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Partager
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content ? (
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">
                Contenu non disponible
              </div>
            )}
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Dernière mise à jour : {new Date(article.updatedAt).toLocaleDateString('fr-FR')}
              </div>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Retour en haut ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}