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
      <section className="relative overflow-hidden">
        {/* Cover Image as Background */}
        {imageUrl && (
          <div className="relative h-96 md:h-[500px]">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-8 md:p-12 text-white">
                {/* Category & Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {tags.length > 0 && (
                    <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                      {tags[0]}
                    </span>
                  )}
                  <div className="flex items-center bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <div className="flex items-center bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      {readTime} de lecture
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight max-w-4xl">
                  {article.title}
                </h1>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
                    {article.excerpt}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* If no image, show regular header */}
        {!imageUrl && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-16">
            <div className="px-8 md:px-12">
              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {tags.length > 0 && (
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                    {tags[0]}
                  </span>
                )}
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {readTime} de lecture
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                  {article.excerpt}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Additional Tags */}
        {tags.length > 1 && (
          <div className="px-8 md:px-12 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {tags.slice(1).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>


    </>
  );
}
