import ProjectForm from './ProjectForm'
import { type Project } from '@/lib/validations'

interface ProjectFormContainerProps {
  initialData?: Partial<Project>
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  isSubmitting: boolean
  submitButtonText: string
}

export default function ProjectFormContainer({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText
}: ProjectFormContainerProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ProjectForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitButtonText={submitButtonText}
        />
      </div>
    </div>
  )
}