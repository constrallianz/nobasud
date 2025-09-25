import { getArticleWithRelatedBySlug } from '@/lib/actions/articles';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const result = await getArticleWithRelatedBySlug(slug);
      return NextResponse.json(result);
    } else {
      const { getArticles } = await import('@/lib/actions/articles');
      const articles = await getArticles();
      return NextResponse.json(articles);
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET() {
//   try {
//     const articles = await prisma.article.findMany({
//       where: { published: true },
//       orderBy: { publishedAt: 'desc' }
//     })
    
//     return NextResponse.json(articles)
//   } catch (error) {
//     console.error('Error fetching articles:', error)
//     return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
//   }
// }