'use client'

import { Article } from '@prisma/client'

interface ArticleContentProps {
  article: Article
  readTime: string
}

function formatArticleContent(content: string | null): string {
  if (!content) return ''
  
  return content
    .split('\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => `<p class="mb-6 text-lg leading-relaxed">${paragraph}</p>`)
    .join('')
}

export default function ArticleContent({ article, readTime }: ArticleContentProps) {
  const formattedContent = formatArticleContent(article.content)

  return (
    <main className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="">
          {/* Article Meta Info */}
          <div className="flex items-center justify-between mb-16 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>Publié le {new Date(article.publishedAt).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{readTime} de lecture</span>
              </div>
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
                    // Show a brief notification
                    const button = document.activeElement as HTMLButtonElement
                    const originalText = button.textContent
                    button.textContent = 'Copié!'
                    setTimeout(() => {
                      button.textContent = originalText
                    }, 2000)
                  }
                }}
                className="group relative px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-orange text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-semibold"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Partager
                </span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-xl dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-brand-orange hover:prose-a:text-brand-blue prose-strong:text-gray-900 dark:prose-strong:text-white">
            {formattedContent ? (
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ 
                  __html: formattedContent 
                }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.125rem'
                }}
              />
            ) : article.content ? (
              // Fallback for existing HTML content
              <div 
                className="article-content text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.125rem'
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Contenu en cours de préparation
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Le contenu de cet article sera bientôt disponible
                </p>
              </div>
            )}
          </article>

          {/* Article Footer */}
          <footer className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Dernière mise à jour
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {new Date(article.updatedAt).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="group flex items-center px-6 py-3 bg-brand-orange hover:bg-brand-blue text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Retour en haut
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      
      <style jsx global>{`
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .article-content h1 { font-size: 2.25rem; }
        .article-content h2 { font-size: 1.875rem; }
        .article-content h3 { font-size: 1.5rem; }
        
        .article-content ul,
        .article-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        
        .article-content blockquote {
          border-left: 4px solid #f97316;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          font-size: 1.125rem;
          color: #6b7280;
        }
        
        .article-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        
        .dark .article-content code {
          background-color: #374151;
        }
        
        .article-content img {
          border-radius: 0.75rem;
          margin: 2rem 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </main>
  )
}