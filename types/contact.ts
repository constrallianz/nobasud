export interface ContactInfo {
  icon: any // React component type for Heroicons
  title: string
  info: string
  description: string
}

export interface Office {
  city: string
  address: string
  phone: string
  email: string
  hours: string
  manager: string
  role: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  projectType: string
  budget?: string
  message: string
}