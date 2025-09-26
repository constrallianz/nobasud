
import { Card, CardContent } from '../ui/card'
import { TrendingUp, Trophy, Users } from 'lucide-react'



export default function CareerBenefits() {
  return (
     <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
              Travailler chez NOBASUD, c'est…
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Participer à des projets structurants</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Contribuez à des réalisations qui marquent durablement le territoire et améliorent la vie des citoyens.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Bénéficier d'une progression rapide</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Évoluez dans une entreprise en pleine croissance avec des opportunités d'avancement concrètes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Développer son expertise</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Apprenez aux côtés de professionnels expérimentés et perfectionnez vos compétences techniques.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

  )
}
