import { MetiersHeroProps } from '@/types/metiers'

export default function MetiersHero({ }: MetiersHeroProps) {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Nos <span className="text-brand-orange">métiers</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
            NOBASUD intervient sur toute la chaîne de valeur du BTP, du gros œuvre à 
            l&apos;aménagement final des espaces. Nous mobilisons des équipes pluridisciplinaires 
            pour offrir des solutions complètes, performantes et adaptées aux spécificités 
            de chaque territoire.
          </p>
        </div>
      </div>
    </section>
  )
}
