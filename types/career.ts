export interface Job {
  imageUrl?: string | null
  id: string
  title: string
  slug: string
  type: string
  experience: string | null
  education: string | null
  requirements: string | null
  benefits: string | null
  salary: string | null
  deadline: Date | null
  department: string | null
  location: string | null
  description: string | null
  published: boolean
  urgent: boolean
  createdAt: Date
  updatedAt: Date
}

export interface JobFormData {
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
  urgent: boolean
  imageFile?: File | undefined
  imageUrl?: string | null
}



export interface ApplicationFormData {
  name: string
  email: string
  cv: File
  coverLetter?: File
  message?: string
}
