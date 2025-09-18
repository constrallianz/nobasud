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
