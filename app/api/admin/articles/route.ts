import { NextResponse } from 'next/server'
import { getAllArticles, createArticle } from '@/lib/actions/articles'
import { uploadBufferToCloudinary } from '@/lib/cloudinary'
import { articleSchema } from '@/lib/validations'
import { protectRoute, AuthenticatedRequest } from '@/lib/auth-middleware'

async function getArticlesHandler(request: AuthenticatedRequest) {
  try {
    const articles = await getAllArticles()
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

async function createArticleHandler(request: AuthenticatedRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();

      let coverImageUrl = (form.get('coverImageUrl') as string) || '';
      const file = form.get('coverImage') as File | null;

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result: any = await uploadBufferToCloudinary(buffer, 'nobasud/articles');
        coverImageUrl = result.secure_url;
      }

      const raw = {
        title: (form.get('title') as string) || '',
        slug: (form.get('slug') as string) || '',
        excerpt: (form.get('excerpt') as string) || '',
        content: (form.get('content') as string) || '',
        published: String(form.get('published') ?? 'true') === 'true',
        publishedAt: (form.get('publishedAt') as string) || new Date().toISOString(),
        tags: (form.get('tags') as string) || '[]',
        coverImageUrl,
      };

      const data = articleSchema.parse(raw);

      const article = await createArticle(data);
      return NextResponse.json(article, { status: 201 });
    }

    const body = await request.json();
    body.published = !!body.published;
    const data = articleSchema.parse(body);

    const article = await createArticle(data);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

export const GET = protectRoute(getArticlesHandler)
export const POST = protectRoute(createArticleHandler)

