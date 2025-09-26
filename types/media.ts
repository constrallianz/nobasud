export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  coverImageUrl: string | null
  tags: string | null
  publishedAt: Date
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  count: number
}

export interface MediaCategoriesProps {
  categories: string[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

export interface FeaturedArticleProps {
  article: Article | null
  loading: boolean
  getImageUrl: (article: Article) => string
  getReadTime: (content: string | null) => string
}

export interface ArticlesGridProps {
  articles: Article[]
  loading: boolean
  searchTerm: string
  getImageUrl: (article: Article) => string
  getReadTime: (content: string | null) => string
}

export interface NewsletterProps {
  // No props needed for static newsletter component
}

export interface MediaSearchState {
  searchTerm: string
  selectedCategory: string
  articles: Article[]
  loading: boolean
}