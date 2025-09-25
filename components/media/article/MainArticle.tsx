"use client";

import ArticleContent from "@/components/media/article/ArticleContent";
import ArticleHeader from "@/components/media/article/ArticleHeader";
import RelatedArticles from "@/components/media/article/RelatedArticles";
import { getImageUrl, getReadTime, parseArticleTags } from "@/lib/media-utils";
import { useEffect, useState } from "react";
import { SidebarList, SidebarSection } from "./SidebarList";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function MainArticle({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<any>(null);
  const [related, setRelatedArticle] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/articles?slug=${params.slug}`);
        const data = await res.json();
        setArticle(data.article);
        setRelatedArticle(
          (data.relatedArticles || []).map((a: any) => ({
            ...a,
            imageUrl: getImageUrl(a),
            readTime: getReadTime(a.content),
          }))
        );
      } catch (err) {
        console.error("Error fetching article:", err);
      }
    };
    if (params.slug) {
      fetchData();
    }
  }, [params.slug]);

  const tags = parseArticleTags(article?.tags);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: main article */}
          <div className="lg:col-span-8">
            {article && (
              <>
                <ArticleHeader
                  article={article}
                  imageUrl={getImageUrl(article)}
                  readTime={getReadTime(article.content)}
                  tags={tags}
                />
                <ArticleContent
                  article={article}
                  readTime={getReadTime(article.content)}
                />
              </>
            )}
          </div>

          {/* RIGHT: sidebar */}
          <aside className="mt-6 lg:col-span-4">
            <div className="space-y-8">
              {/* Related (reuse the same array you already get) */}
              {related.length > 0 && (
                <SidebarSection title="Plus d'articles">
                  <SidebarList articles={related} />
                </SidebarSection>
              )}
            </div>
          </aside>
        </div>
       {related.length > 0 && <RelatedArticles articles={related} />}

      </div>
    </div>
  );
}
