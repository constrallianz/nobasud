export interface Job {
  imageUrl?: string | null
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
  imageFile?: File | undefined
  imageUrl?: string | null
}


export interface Benefit {
  icon: any 
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
