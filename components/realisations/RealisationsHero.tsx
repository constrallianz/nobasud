export default function RealisationsHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nos <span className="text-brand-orange">réalisations</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed">
            Découvrez notre portfolio de projets emblématiques qui transforment 
            le paysage urbain du Maroc et témoignent de notre savoir-faire.
          </p>
        </div>
      </div>
    </section>
  )
}