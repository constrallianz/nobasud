'use client'
import { Button } from '@/components/ui/button'
import { 
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function ContactHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contactez <span className="text-brand-orange">NOBASUD</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            Discutons de votre projet et trouvons ensemble les meilleures solutions 
            pour vos besoins en construction et aménagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="inline-block">
              <Button size="lg" className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-8 py-4 text-lg">
                Nous contacter
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="#bureaux" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue px-8 py-4 text-lg">
                Nos bureaux
                <MapPinIcon className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
