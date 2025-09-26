import { Users } from 'lucide-react'
import React from 'react'

const FeedbackReason = () => {
  return (
     <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-black mb-8">
              Pourquoi votre feedback est important
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Amélioration continue</h3>
                <p className="opacity-90">
                  Vos retours nous aident à perfectionner nos méthodes et à livrer des projets toujours plus qualitatifs.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Écoute citoyenne</h3>
                <p className="opacity-90">
                  Nous croyons en l'importance du dialogue avec les habitants des territoires où nous intervenons.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Transparence</h3>
                <p className="opacity-90">
                  Votre feedback contribue à maintenir un haut niveau de transparence dans nos activités.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default FeedbackReason