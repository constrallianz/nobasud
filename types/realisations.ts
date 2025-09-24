// Project Interface (extended from Prisma)
export interface ProjectWithImages {
  id: string
  name: string
  type: string
  location: string | null
  description: string | null
  createdAt: Date
  images: string[]
  image: string
}

// Statistics Interface
export interface Statistic {
  value: string
  label: string
  sublabel: string
}

// Component Props Interfaces
export interface RealisationsHeroProps {}

export interface RealisationsProjectsProps {
  projects: ProjectWithImages[]
  categories: string[]
}

export interface RealisationsStatsProps {
  stats: Statistic[]
}