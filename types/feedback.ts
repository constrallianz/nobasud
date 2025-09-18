export interface Feedback {
  id: string
  name: string
  email: string
  company: string | null
  project: string | null
  rating: number
  message: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FeedbackStat {
  value: string
  label: string
}

export interface FeedbackFormData {
  name: string
  email: string
  company?: string
  project: string
  rating: number
  comment: string
  photos?: FileList
  consent: boolean
}