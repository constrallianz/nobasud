interface JobFormData {
  title: string
  department: string
  location: string
  type: string
  experience: string
  education: string
  description: string
  requirements: string
  benefits: string
  salary: string
  deadline: string
}

interface JobDescriptionFieldsProps {
  formData: JobFormData
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function JobDescriptionFields({ formData, onChange }: JobDescriptionFieldsProps) {
  return (
    <div className="space-y-6">
      <JobDescriptionField formData={formData} onChange={onChange} />
      <JobRequirementsField formData={formData} onChange={onChange} />
      <JobBenefitsField formData={formData} onChange={onChange} />
    </div>
  )
}

function JobDescriptionField({ formData, onChange }: JobDescriptionFieldsProps) {
  return (
    <div>
      <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Description du poste *
      </label>
      <textarea
        id="job-description"
        name="description"
        value={formData.description}
        onChange={onChange}
        rows={6}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Décrivez en détail les responsabilités et missions du poste..."
        required
      />
    </div>
  )
}

function JobRequirementsField({ formData, onChange }: JobDescriptionFieldsProps) {
  return (
    <div>
      <label htmlFor="job-requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Exigences et qualifications *
      </label>
      <textarea
        id="job-requirements"
        name="requirements"
        value={formData.requirements}
        onChange={onChange}
        rows={5}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Listez les compétences requises, qualifications, etc..."
        required
      />
    </div>
  )
}

function JobBenefitsField({ formData, onChange }: JobDescriptionFieldsProps) {
  return (
    <div>
      <label htmlFor="job-benefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Avantages (optionnel)
      </label>
      <textarea
        id="job-benefits"
        name="benefits"
        value={formData.benefits}
        onChange={onChange}
        rows={4}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Décrivez les avantages offerts par le poste..."
      />
    </div>
  )
}