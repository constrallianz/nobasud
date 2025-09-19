import { Button } from '@/components/ui/button'
import { BeakerIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function ApprochInnovation() {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <BeakerIcon className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Innovation & <span className="text-brand-orange">Recherche</span>
          </h2>
          <p className="text-xl leading-relaxed mb-8">
            Nous investissons continuellement dans la recherche et le développement 
            pour vous offrir les solutions les plus avancées du marché.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5%</div>
              <p>du CA investi en R&D</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">12</div>
              <p>brevets déposés</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">3</div>
              <p>laboratoires partenaires</p>
            </div>
          </div>

          <Button size="lg" className="mt-8 bg-white text-brand-blue hover:bg-white/90 px-8 py-4">
            Découvrir nos innovations
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}