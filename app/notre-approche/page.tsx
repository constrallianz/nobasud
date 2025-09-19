import { methodology, values, caseStudies } from '@/data/approche'
import ApprochHero from '@/components/approche/ApprochHero'
import ApprochMethodology from '@/components/approche/ApprochMethodology'
import ApprochValues from '@/components/approche/ApprochValues'
import ApprochCaseStudies from '@/components/approche/ApprochCaseStudies'
import ApprochInnovation from '@/components/approche/ApprochInnovation'

export default function NotreApprochePage() {
  return (
    <div className="relative">
      <ApprochHero />
      <ApprochMethodology methodology={methodology} />
      <ApprochValues values={values} />
      <ApprochCaseStudies caseStudies={caseStudies} />
      <ApprochInnovation />
    </div>
  )
}
