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
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Articles similaires
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={getImageUrl(article)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime={article.publishedAt.toISOString()}>
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                    </time>
                    <span>{getReadTime(article.content)} min</span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  {article.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <Link
                    href={`/media/${article.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm group-hover:underline"
                  >
                    Lire l'article
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/media"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Voir tous les articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}