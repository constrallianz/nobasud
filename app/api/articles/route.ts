import { getArticles, getArticleWithRelatedBySlug } from '@/lib/actions/articles';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const result = await getArticleWithRelatedBySlug(slug);
      return NextResponse.json(result);
    } else {
      const articles = await getArticles();
      return NextResponse.json(articles);
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
