"use client";

import { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeftCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface ArticleHeaderProps {
  article: Article;
  imageUrl: string;
  readTime: string;
  tags: string[];
}

export default function ArticleHeader({
  article,
  imageUrl,
  readTime,
  tags,
}: ArticleHeaderProps) {
  return (
    <>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-brand-orange rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-brand-blue rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-brand-orange rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                href="/media"
                className="group inline-flex items-center text-brand-orange hover:text-brand-blue transition-all duration-200 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <ArrowLeftCircleIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Retour aux articles</span>
              </Link>
            </div>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                <CalendarDaysIcon className="w-5 h-5 mr-2 text-brand-orange" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                <ClockIcon className="w-5 h-5 mr-2 text-brand-blue" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {readTime} de lecture
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                {article.title}
              </span>
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      index % 2 === 0 
                        ? 'bg-brand-orange text-white shadow-md hover:shadow-lg' 
                        : 'bg-brand-blue text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    <TagIcon className="w-4 h-4 mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {imageUrl && (
        <section className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-brand-blue rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-white">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
