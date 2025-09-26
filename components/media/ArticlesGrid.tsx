import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ArticlesGridProps } from "@/types/media";
import { ArticlesGridSkeleton } from "./MediaStates";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
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
  const formatDate = (date: Date) => new Date(date).toLocaleDateString("fr-FR");

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {filteredPosts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden hover:shadow-xl transition-shadow group"
        >
          <div className="relative">
            <div
              className="h-48 bg-cover bg-center transition-transform group-hover:scale-105"
              style={{
                backgroundImage: getImageUrl(post)
                  ? `url(${getImageUrl(post)})`
                  : "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary font-medium"
              >
                {/* {post.category} */} Category
              </Badge>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
            </div>
            <h3
              className="text-xl font-bold text-foreground mb-3 line-clamp-2"
              data-testid={`post-title-${post.id}`}
            >
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <Link href={`/media/${post.slug}`}>
              <Button
                variant="ghost"
                className="p-2 py-1 h-auto text-primary hover:text-primary/80 font-semibold"
              >
                Lire la suite
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
