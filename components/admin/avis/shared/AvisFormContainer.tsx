import AvisForm from './AvisForm'
import { type Feedback } from '@/lib/validations'

interface AvisFormContainerProps {
  readonly initialData?: Partial<Feedback>
  readonly onSubmit: (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  readonly isSubmitting: boolean
  readonly submitButtonText: string
}

export default function AvisFormContainer({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText
}: AvisFormContainerProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <AvisForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitButtonText={submitButtonText}
        />
      </div>
    </div>
  )
}