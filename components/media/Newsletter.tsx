'use client'

import { Button } from '../ui/button'

export default function Newsletter() {


  return (
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-6">
              Restez informé de nos actualités
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Abonnez-vous à notre newsletter pour recevoir nos dernières nouvelles et articles directement dans votre boîte mail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
                data-testid="input-newsletter-email"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}
