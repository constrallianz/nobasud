import { ComponentType } from 'react'

// Methodology Phase Interface
export interface MethodologyPhase {
  icon: ComponentType<{ className?: string }>
  title: string
  duration: string
  description: string
  steps: string[]
}

// Company Value Interface
export interface CompanyValue {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  benefits: string[]
}

// Case Study Interface
export interface CaseStudy {
  title: string
  location: string
  challenge: string
  solution: string
  results: string[]
  image: string
}

// Component Props Interfaces
export interface ApprochHeroProps {}

export interface ApprochMethodologyProps {
  methodology: MethodologyPhase[]
}

export interface ApprochValuesProps {
  values: CompanyValue[]
}

export interface ApprochCaseStudiesProps {
  caseStudies: CaseStudy[]
}

export interface ApprochInnovationProps {}