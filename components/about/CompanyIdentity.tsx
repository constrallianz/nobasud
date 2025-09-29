export default function CompanyIdentity() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
            Une entreprise familiale solidement ancrée dans son territoire
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fondée en 2017, NOBASUD s'appuie sur l'expérience de deux générations actives dans le BTP depuis les années 1970. Cette expertise transgénérationnelle nous confère une compréhension unique du marché marocain et des attentes de nos clients.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nous combinons savoir-faire traditionnel et innovations modernes pour livrer des projets d'exception, en gardant toujours à l'esprit notre engagement envers la qualité et la satisfaction client.
              </p>
            </div>
            <div 
              className="h-96 bg-cover bg-center rounded-xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}