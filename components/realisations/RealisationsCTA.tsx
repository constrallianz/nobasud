import React from 'react'
import { Button } from '../ui/button'

const RealisationsCTA = () => {
  return (
     <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-8">
              Un projet en tête ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Vous souhaitez en savoir plus sur un projet ou nous consulter pour un appel d'offres ?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <a href="/contact" data-testid="button-contact-project">
                  Nous contacter
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
                <a href="/brochure.pdf" target="_blank" data-testid="button-download-brochure">
                  Télécharger notre brochure PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default RealisationsCTA