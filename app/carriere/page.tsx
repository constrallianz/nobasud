import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offres d’emploi et recrutement | Rejoindre NOBASUD',
  description: 'Découvrez les opportunités de carrière chez NOBASUD : ingénieurs, chefs de chantier, conducteurs de travaux… Rejoignez une entreprise en pleine croissance dans le BTP.'
}
import CareerHero from '@/components/career/CareerHero'
import CareerBenefits from '@/components/career/CareerBenefits'
import JobListings from '@/components/career/JobListings'
import ApplicationForm from '@/components/career/ApplicationForm'

export default function CarrierePage() {
  return (
    <div className="relative">
      <CareerHero />
      <CareerBenefits />
      <JobListings />
      <ApplicationForm />
    </div>
  )
}
