"use client";

import { useState } from "react";
import ArticleContent from "@/components/media/article/ArticleContent";
import ArticleHeader from "@/components/media/article/ArticleHeader";
import RelatedArticles from "@/components/media/article/RelatedArticles";
import BreakingNewsTicker from "@/components/media/BreakingNewsTicker";
import MediaNavBar from "@/components/media/MediaNavBar";
import SidebarWidgets from "@/components/media/SidebarWidgets";
import { getImageUrl, getReadTime, parseArticleTags } from "@/lib/media-utils";
import { SidebarList, SidebarSection } from "./SidebarList";
import { ArrowLeftIcon, ShareIcon, BookmarkIcon, PrinterIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useArticleData } from "@/hooks/useArticleData";
import { useMediaData } from "@/hooks/useMediaData";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function MainArticle({ params }: Readonly<ArticlePageProps>) {
  const { article, relatedArticles } = useArticleData(params.slug);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {
      filteredArticles,
    } = useMediaData();
  const secondaryArticles = filteredArticles.slice(1, 5);

  const tags = parseArticleTags(article?.tags || null);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title || '',
        text: article?.excerpt || '',
        url: window.location.href,
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breaking News Ticker */}
      <BreakingNewsTicker />
      
      {/* Enhanced Navigation */}
      <MediaNavBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              Accueil
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/media" className="text-gray-500 hover:text-primary transition-colors">
              Médias
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {article?.title || 'Article'}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back to Media Button */}
        <div className="mb-6">
          <Link href="/media">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Retour aux actualités</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <main className="lg:col-span-3">
            {article && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <ArticleHeader
                  article={article}
                  imageUrl={getImageUrl(article)}
                  readTime={getReadTime(article.content)}
                  tags={tags}
                />
                
                {/* Article Actions */}
                <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                        className="flex items-center space-x-2"
                      >
                        <ShareIcon className="h-4 w-4" />
                        <span>Partager</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <BookmarkIcon className="h-4 w-4" />
                        <span>Sauvegarder</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.print()}
                        className="flex items-center space-x-2"
                      >
                        <PrinterIcon className="h-4 w-4" />
                        <span>Imprimer</span>
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Publié le {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                <ArticleContent
                  article={article}
                  readTime={getReadTime(article.content)}
                />
              </div>
            )}
          </main>

          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Articles in Sidebar */}
              {relatedArticles.length > 0 && (
                <SidebarSection title="Articles similaires">
                  <SidebarList articles={relatedArticles.slice(0, 3)} />
                </SidebarSection>
              )}
              
              {/* Sidebar Widgets */}
              <SidebarWidgets
                secondaryArticles={secondaryArticles}
              />
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <RelatedArticles articles={relatedArticles} />
          </div>
        )}
      </div>
    </div>
  );
}
