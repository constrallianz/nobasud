import { JobFormData } from "@/types/career"
import { useEffect, useState } from "react"

interface JobBasicInfoProps {
  formData: JobFormData
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onFileChange?: (file?: File) => void
}

export function JobBasicInfo({ formData, onChange, onFileChange }: JobBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <JobTitleField  formData={formData} onChange={onChange} />
      <JobDepartmentField formData={formData} onChange={onChange} />
      <JobImageField onChange={(e) => {}} formData={formData} onFileChange={onFileChange} />
      <JobLocationField formData={formData} onChange={onChange} />
      <JobTypeField formData={formData} onChange={onChange} />
      <JobExperienceField formData={formData} onChange={onChange} />
      <JobEducationField formData={formData} onChange={onChange} />
      <JobSalaryField formData={formData} onChange={onChange} />
      <JobDeadlineField formData={formData} onChange={onChange} />
    </div>
  )
}

function JobImageField({ formData, onFileChange }: JobBasicInfoProps) {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (formData.imageFile) {
      const url = URL.createObjectURL(formData.imageFile)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else if (formData.imageUrl) {
      setPreview(formData.imageUrl)
    } else {
      setPreview(null)
    }
  }, [formData.imageFile, formData.imageUrl])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    onFileChange ? onFileChange(file) : null
  }

  return (
    <div className="md:col-span-2">
      <label htmlFor="job-image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Image (optionnelle)
      </label>
      <div className="flex items-center gap-4">
        <input
          id="job-image"
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="block w-1/2 text-sm text-gray-900 dark:text-gray-100
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-brand-blue/10 file:text-brand-blue
                     hover:file:bg-brand-blue/20
                     dark:file:bg-gray-700 dark:hover:file:bg-gray-600"
        />
        {preview && (
          <img
            src={preview}
            alt="Prévisualisation"
            className="h-16 w-16 rounded-md object-cover border border-gray-200 dark:border-gray-600"
          />
        )}
      </div>
      {(formData.imageFile || formData.imageUrl) && (
        <button
          type="button"
          onClick={() => onFileChange && onFileChange(undefined)}
          className="mt-2 text-xs text-red-600 hover:underline"
        >
          Supprimer l’image
        </button>
      )}
    </div>
  )
}


function JobTitleField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Titre du poste *
      </label>
      <input
        id="job-title"
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="ex: Ingénieur Civil Senior"
        required
      />
    </div>
  )
}

function JobDepartmentField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Département *
      </label>
      <select
        id="job-department"
        name="department"
        value={formData.department}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      >
        <option value="">Sélectionner un département</option>
        <option value="Ingénierie">Ingénierie</option>
        <option value="Construction">Construction</option>
        <option value="Architecture">Architecture</option>
        <option value="Gestion de projet">Gestion de projet</option>
        <option value="Administration">Administration</option>
        <option value="Ressources humaines">Ressources humaines</option>
      </select>
    </div>
  )
}

function JobLocationField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Localisation *
      </label>
      <input
        id="job-location"
        type="text"
        name="location"
        value={formData.location}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="ex: Agadir, Maroc"
        required
      />
    </div>
  )
}

function JobTypeField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Type de contrat *
      </label>
      <select
        id="job-type"
        name="type"
        value={formData.type}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      >
        <option value="CDI">CDI</option>
        <option value="CDD">CDD</option>
        <option value="Stage">Stage</option>
        <option value="Freelance">Freelance</option>
      </select>
    </div>
  )
}

function JobExperienceField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Expérience requise
      </label>
      <input
        id="job-experience"
        type="text"
        name="experience"
        value={formData.experience}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="ex: 3-5 ans"
      />
    </div>
  )
}

function JobEducationField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-education" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Niveau d'éducation
      </label>
      <input
        id="job-education"
        type="text"
        name="education"
        value={formData.education}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="ex: Master en Génie Civil"
      />
    </div>
  )
}

function JobSalaryField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Salaire (optionnel)
      </label>
      <input
        id="job-salary"
        type="text"
        name="salary"
        value={formData.salary}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="ex: 15 000 - 20 000 MAD"
      />
    </div>
  )
}

function JobDeadlineField({ formData, onChange }: JobBasicInfoProps) {
  return (
    <div>
      <label htmlFor="job-deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Date limite de candidature
      </label>
      <input
        id="job-deadline"
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  )
}