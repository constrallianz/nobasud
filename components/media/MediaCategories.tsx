import { MediaCategoriesProps } from '@/types/media'

export default function MediaCategories({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: MediaCategoriesProps) {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 border-b">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-brand-blue text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
