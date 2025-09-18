'use client'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function CareerHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Rejoignez <span className="text-brand-orange">l&apos;équipe</span> NOBASUD
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            Construisez votre carrière avec nous et participez à des projets 
            qui transforment le paysage urbain du Maroc.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#offres" className="inline-block">
              <Button size="lg" className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-8 py-4 text-lg">
                Voir les offres
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="#candidature" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue px-8 py-4 text-lg">
                Candidature spontanée
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
