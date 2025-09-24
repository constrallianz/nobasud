import { Button } from '@/components/ui/button'
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline'

export default function ApprochHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Notre <span className="text-brand-orange">approche</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            Une méthodologie éprouvée, des valeurs fortes et un engagement total 
            pour la réussite de vos projets de construction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#methodologie" className="inline-block">
              <Button size="lg" className="bg-white text-brand-blue hover:bg-white/90 px-8 py-4 text-lg">
                Notre méthode
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="#etudes-cas" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-blue px-8 py-4 text-lg">
                Études de cas
                <PlayIcon className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}