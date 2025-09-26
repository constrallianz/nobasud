'use client'

export default function CareerHero() {
  return (
    <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-primary mb-6" data-testid="careers-title">
              Rejoignez les bâtisseurs du Sud
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Chez NOBASUD, nous croyons au potentiel humain et à l'engagement local. Chaque chantier est l'occasion de construire, mais aussi de transmettre, former et faire évoluer nos collaborateurs. Nous recrutons des talents ambitieux, rigoureux et animés par le goût du terrain.
            </p>
          </div>
        </div>
      </section>
  )
}
