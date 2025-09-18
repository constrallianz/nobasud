export interface Job {
  id: string
  title: string
  slug: string
  department: string | null
  location: string | null
  description: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Benefit {
  icon: any // React component type for Heroicons
  title: string
  description: string
}

export interface ApplicationFormData {
  name: string
  email: string
  cv: File
  coverLetter?: File
  message?: string
}
