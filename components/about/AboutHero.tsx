export default function AboutHero() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-primary mb-6" data-testid="about-title">
            À propos de NOBASUD
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Acteur engagé du secteur BTP au Maroc, NOBASUD porte une vision ambitieuse : bâtir des infrastructures pérennes qui améliorent la vie des citoyens et accompagnent le développement des territoires. Notre approche repose sur l'excellence opérationnelle, l'engagement humain et une profonde connaissance du terrain.
          </p>
        </div>
      </div>
    </section>
  );
}