import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { ArticlesGridProps } from "@/types/media";
import { ArticlesGridSkeleton } from "./MediaStates";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";

export default function ArticlesGrid({
  articles,
  loading,
  searchTerm,
  getImageUrl,
  getReadTime,
}: ArticlesGridProps) {
  if (loading) {
    return <ArticlesGridSkeleton />;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Aucun article trouvé
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Essayez de modifier vos critères de recherche ou de sélectionner une
          autre catégorie.
        </p>
      </div>
    );
  }

  const filteredPosts = articles;
  const formatDate = (date: Date | string) => {
    // Handle invalid dates
    if (!date) {
      return 'Date invalide'
    }
    
    // Convert to Date object if it's a string
    const dateObj = new Date(date)
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Date invalide'
    }
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(dateObj)
  }

  const getCategory = (post: any) => {
    if (post.tags && Array.isArray(JSON.parse(post.tags))) {
      return JSON.parse(post.tags)[0] || 'ACTUALITÉS'
    }
    return 'ACTUALITÉS'
  }

  const getRandomViews = () => Math.floor(Math.random() * 500) + 100
  const getRandomComments = () => Math.floor(Math.random() * 20) + 1

  return (
    <div className="space-y-8">
      {/* Main Articles Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {filteredPosts.slice(0, 3).map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white dark:bg-gray-800 shadow-lg"
          >
            <div className="relative">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={getImageUrl(post) || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-600 hover:bg-red-700 text-white border-0 font-semibold px-3 py-1">
                  {getCategory(post)}
                </Badge>
              </div>

              {/* Read Time Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/30 text-white border-0 backdrop-blur-sm">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {getReadTime ? getReadTime(post.content) : '5 min'}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Article Meta */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-sm">
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    {getRandomViews()}
                  </div>
                  <div className="flex items-center">
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                    {getRandomComments()}
                  </div>
                </div>
              </div>

              {/* Article Title */}
              <h3
                className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight"
                data-testid={`post-title-${post.id}`}
              >
                {post.title}
              </h3>

              {/* Article Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Article Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <UserIcon className="h-4 w-4 mr-1" />
                  Équipe NOBASUD
                </div>
                
                <Link href={`/media/${post.slug}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 font-semibold p-0 h-auto hover:bg-transparent"
                  >
                    Lire plus
                    <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Remaining Articles in List View */}
      {filteredPosts.length > 3 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-primary pb-2">
            Plus d'actualités
          </h3>
          <div className="space-y-4">
            {filteredPosts.slice(3).map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700"
              >
                <CardContent className="p-0">
                  <Link href={`/media/${post.slug}`} className="flex">
                    {/* Image */}
                    <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
                      <Image
                        src={getImageUrl(post) || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-primary/10 text-primary border-0 text-xs">
                          {getCategory(post)}
                        </Badge>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-xs">
                          <div className="flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {getReadTime ? getReadTime(post.content) : '5 min'}
                          </div>
                          <div className="flex items-center">
                            <EyeIcon className="h-3 w-3 mr-1" />
                            {getRandomViews()}
                          </div>
                        </div>

                        <ArrowRightIcon className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
