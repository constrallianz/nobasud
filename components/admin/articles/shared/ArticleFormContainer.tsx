import ArticleForm from './ArticleForm'
import { type Article } from '@/lib/validations'

interface ArticleFormContainerProps {
  initialData?: Partial<Article>
  onSubmit: (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  isSubmitting: boolean
  submitButtonText: string
}

export default function ArticleFormContainer({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText
}: ArticleFormContainerProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ArticleForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitButtonText={submitButtonText}
        />
      </div>
    </div>
  )
}