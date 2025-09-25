'use client'

import { Article } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedArticlesProps {
  articles: Article[]
  getImageUrl: (article: Article) => string
  getReadTime: (content: string | null) => string
}

export default function RelatedArticles({ articles, getImageUrl, getReadTime }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Articles <span className="text-brand-orange">similaires</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Découvrez d'autres contenus qui pourraient vous intéresser
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={getImageUrl(article)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-2 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <time dateTime={article.publishedAt.toISOString()}>
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short',
                          year: 'numeric' 
                        })}
                      </time>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-2 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{getReadTime(article.content)}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-brand-orange transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  {article.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <Link
                    href={`/media/${article.slug}`}
                    className="group/link inline-flex items-center text-brand-blue hover:text-brand-orange font-semibold transition-colors duration-200"
                  >
                    <span>Lire l'article</span>
                    <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              href="/media"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-orange text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Voir tous les articles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}