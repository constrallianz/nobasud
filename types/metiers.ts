import { ComponentType } from 'react'

export interface Metier {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  references: string[]
  savoirFaire: string[]
  image: string
}

export interface MetiersHeroProps {
  // No props needed for static hero component
}

export interface MetiersSectionProps {
  metiers: Metier[]
}

export interface MetiersCTAProps {
  // No props needed for static CTA component
}

export interface MetiersData {
  metiers: Metier[]
}