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
  readTime: number;
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
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <Link
                  href="/media"
                  className="inline-flex items-center text-brand-orange hover:text-brand-blue transition-colors"
                >
                  <ArrowLeftCircleIcon className="w-4 h-4 mr-2" />
                  Retour aux articles
                </Link>
              </div>
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                {formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                {readTime} de lecture
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
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
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
