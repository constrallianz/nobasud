'use client'
import { Button } from '@/components/ui/button'
import { 
  ChatBubbleLeftRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function FeedbackHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Avis <span className="text-brand-orange">clients</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            Découvrez l&apos;expérience de nos clients et partagez la vôtre. 
            Votre satisfaction est notre plus belle récompense.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#avis" className="inline-block">
              <Button size="lg" className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-8 py-4 text-lg">
                Lire les avis
                <ChatBubbleLeftRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="#donner-avis" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue px-8 py-4 text-lg">
                Donner mon avis
                <HeartIcon className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
