import { metiers } from '@/data/metiers'
import MetiersHero from '@/components/metiers/MetiersHero'
import MetiersSection from '@/components/metiers/MetiersSection'
import MetiersCTA from '@/components/metiers/MetiersCTA'

export const metadata = {
  title: 'Expertises BTP | Construction, VRD, aménagements urbains – NOBASUD',
  description: 'NOBASUD intervient dans tous les métiers du BTP : gros œuvre, VRD, infrastructures et aménagements urbains. Découvrez notre approche opérationnelle et nos expertises.'
}

export default function NosMetiersPage() {
  return (
    <div className="relative">
      <MetiersHero />
      <MetiersSection metiers={metiers} />
      <MetiersCTA />
    </div>
  )
}
