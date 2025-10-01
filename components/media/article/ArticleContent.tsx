"use client";

import { Article } from "@prisma/client";

interface ArticleContentProps {
  article: Article;
  readTime: string;
}

function formatArticleContent(content: string | null): string {
  if (!content) return "";

  return content
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)
    .map(
      (paragraph) => `<p class="mb-6 text-lg leading-relaxed">${paragraph}</p>`
    )
    .join("");
}

function renderArticleContent(formattedContent: string, originalContent: string | null) {
  if (formattedContent) {
    return (
      <div
        className="article-content"
        dangerouslySetInnerHTML={{
          __html: formattedContent,
        }}
        style={{
          lineHeight: "1.8",
          fontSize: "1.125rem",
        }}
      />
    );
  }
  
  if (originalContent) {
    return (
      <div
        className="article-content text-gray-700 dark:text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: originalContent }}
        style={{
          lineHeight: "1.8",
          fontSize: "1.125rem",
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Contenu en cours de préparation
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        Le contenu de cet article sera bientôt disponible
      </p>
    </div>
  );
}

export default function ArticleContent({
  article,
  readTime,
}: Readonly<ArticleContentProps>) {
  const formattedContent = formatArticleContent(article.content);

  return (
    <div className="p-8 md:p-12">
      {/* Article Meta Info */}
      <div className="mb-8">
        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-accent"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Publié le{" "}
              {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-accent"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{readTime} de lecture</span>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <div className="flex justify-end mb-8">
        <button className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-primary transition-colors duration-200">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Partager
        </button>
      </div>

      {/* Article Content */}
      <article className="prose prose-xl dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-accent hover:prose-a:text-primary prose-strong:text-gray-900 dark:prose-strong:text-white">
        {renderArticleContent(formattedContent, article.content)}
      </article>

      {/* Author and Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Équipe Nobasud
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Experts en construction et rénovation
              </p>
            </div>
          </div>
          
          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Retour en haut
          </button>
        </div>
      </footer>

    </div>
  );
}
