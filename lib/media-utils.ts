import { Article } from '@/types/media'

/**
 * Calculate estimated reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function getReadTime(content: string | null): string {
  if (!content) return '3 min'
  
  const words = content.split(/\s+/).length
  const readingTime = Math.ceil(words / 200)
  
  return `${readingTime} min`
}

/**
 * Get image URL for an article with fallback
 */
export function getImageUrl(article: Article): string {
  if (article.coverImageUrl) {
    return article.coverImageUrl
  }
  
  // Return a relevant fallback image based on article tags
  const tags = parseArticleTags(article.tags)
  
  if (tags.includes('Projets')) {
    return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
  
  if (tags.includes('Innovation')) {
    return 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
  
  if (tags.includes('Conseils')) {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
  
  // Default construction/BTP image
  return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}

/**
 * Parse article tags from JSON string or return empty array
 */
export function parseArticleTags(tags: string | null): string[] {
  if (!tags) return []
  
  try {
    const parsed = Array.isArray(tags) ? tags : JSON.parse(tags)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format date for display (short version)
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

/**
 * Get tag color based on tag name
 */
export function getTagColor(tag: string): string {
  const colors: Record<string, string> = {
    'Actualités': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'Projets': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'Innovation': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'Conseils': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    'BTP': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Architecture': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
  }
  
  return colors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
}