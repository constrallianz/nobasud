'use client'

import { JobFormHeader } from '@/components/admin/jobs/new-jobs/JobFormHeader'
import { JobBasicInfo } from '@/components/admin/jobs/new-jobs/JobBasicInfo'
import { JobDescriptionFields } from '@/components/admin/jobs/new-jobs/JobDescriptionFields'
import { JobFormActions } from '@/components/admin/jobs/new-jobs/JobFormActions'
import { useJobForm } from '@/components/admin/jobs/new-jobs/useJobForm'

export default function NewJobPage() {
  const {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    handleFileChange
  } = useJobForm()

  return (
    <div className="space-y-8">
      {/* Header */}
      <JobFormHeader
        title="Nouvelle offre d'emploi"
        subtitle="Créer une nouvelle offre d'emploi"
        backLink="/admin/jobs"
      />

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <JobBasicInfo 
            formData={formData}
            onChange={handleChange}
            onFileChange={handleFileChange}
          />

          {/* Description Fields */}
          <JobDescriptionFields 
            formData={formData}
            onChange={handleChange}
          />

          {/* Form Actions */}
          <JobFormActions
            cancelLink="/admin/jobs"
            isSubmitting={isSubmitting}
            onCancel={resetForm}
          />
        </form>
      </div>
    </div>
  )
}
