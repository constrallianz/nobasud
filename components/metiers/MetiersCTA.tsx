import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { MetiersCTAProps } from '@/types/metiers'

export default function MetiersCTA({ }: MetiersCTAProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Besoin d&apos;un partenaire fiable pour vos <span className="text-brand-orange">chantiers</span> ?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/realisations">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 px-8 py-4 text-lg">
                Voir nos réalisations
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 text-lg">
                Contactez notre équipe
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
