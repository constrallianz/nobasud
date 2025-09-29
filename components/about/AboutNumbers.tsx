export default function AboutNumbers() {
  const stats = [
    {
      number: "250+",
      label: "Collaborateurs"
    },
    {
      number: "75+",
      label: "Projets réalisés"
    },
    {
      number: "8",
      label: "Régions couvertes"
    },
    {
      number: "98%",
      label: "Satisfaction client"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
            Une croissance maîtrisée, portée par le terrain
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-muted p-8 rounded-xl text-center">
            <h3 className="text-xl font-bold text-primary mb-4">Notre présence territoriale</h3>
            <p className="text-muted-foreground">
              [Carte interactive montrant notre implantation dans les 8 régions du Maroc]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}