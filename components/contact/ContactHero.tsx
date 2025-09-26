

export default function ContactHero() {
  return (
    <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-primary mb-6" data-testid="contact-title">
              Nous contacter
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Notre équipe est à votre disposition pour étudier vos projets et vous accompagner dans leur réalisation. 
              N'hésitez pas à nous contacter pour toute demande d'information ou de devis.
            </p>
          </div>
        </div>
      </section>
  )
}
