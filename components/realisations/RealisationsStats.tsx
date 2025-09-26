
export default function RealisationsStats() {
  return (
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-12">
              Performance et qualité
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl font-black text-accent mb-4">95%</div>
                <div className="text-lg font-semibold mb-2">Projets livrés dans les délais</div>
                <p className="text-sm opacity-90">Respect strict des plannings établis</p>
              </div>
              
              <div>
                <div className="text-5xl font-black text-accent mb-4">100%</div>
                <div className="text-lg font-semibold mb-2">Conformité qualité</div>
                <p className="text-sm opacity-90">Tous nos projets respectent les normes</p>
              </div>
              
              <div>
                <div className="text-5xl font-black text-accent mb-4">0</div>
                <div className="text-lg font-semibold mb-2">Accident de travail</div>
                <p className="text-sm opacity-90">Sécurité prioritaire sur nos chantiers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}