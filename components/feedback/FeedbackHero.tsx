'use client'

import { MessageCircle } from "lucide-react"

export default function FeedbackHero() {
  return (
     <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl lg:text-6xl font-black text-primary mb-6" data-testid="feedback-title">
              Feedback Citoyen
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Votre avis compte pour nous. Partagez votre feedback sur nos chantiers, suggérez des améliorations 
              ou signalez tout point qui mérite notre attention. Ensemble, construisons mieux.
            </p>
          </div>
        </div>
      </section>

  )
}
