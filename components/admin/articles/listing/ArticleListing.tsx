'use client';

import { useRouter } from 'next/navigation';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import type { Article } from '@/lib/validations';

interface ArticleListingProps {
  articles: Article[];
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ArticleListing({ articles, onDelete, isLoading }: ArticleListingProps) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/admin/articles/edit/${id}`);
  };

  const handleView = (id: string) => {
    // Navigate to article detail or preview
    window.open(`/articles/${id}`, '_blank');
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Non définie';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Aucun article</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Commencez par créer votre premier article.</p>
        <div className="mt-6">
          <button
            onClick={() => router.push('/admin/articles/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Nouvel article
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => {
        if (!article.id) return null;
        
        return (
          <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
                    {article.title}
                  </h3>
                  {article.published ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Publié
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                      Brouillon
                    </span>
                  )}
                </div>
                
                {article.excerpt && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Créé le {formatDate(article.createdAt)}</span>
                  {article.publishedAt && (
                    <span>Publié le {formatDate(article.publishedAt)}</span>
                  )}
                  {(() => {
                    try {
                      let tags: string[] = [];
                      if (article.tags) {
                        if (typeof article.tags === 'string') {
                          tags = JSON.parse(article.tags);
                        } else {
                          tags = article.tags;
                        }
                      }
                      
                      return tags.length > 0 && (
                        <div className="flex gap-1">
                          {tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{tags.length - 3} autres
                            </span>
                          )}
                        </div>
                      );
                    } catch (error) {
                      console.error('Error parsing article tags:', error);
                      return null;
                    }
                  })()}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleView(article.id!)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  title="Voir l'article"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEdit(article.id!)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                  title="Modifier"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                      onDelete(article.id!);
                    }
                  }}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  title="Supprimer"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}