import { Briefcase, Send, TrendingUp, Trophy, Users } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const CareersSection = () => {
  return (
    <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl lg:text-5xl font-black text-primary mb-6"
              data-testid="careers-title"
            >
              Rejoignez les bâtisseurs du Sud
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Chez NOBASUD, nous croyons au potentiel humain et à l'engagement
              local. Rejoignez une entreprise en pleine croissance, au cœur des
              projets qui façonnent le Maroc de demain.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Projets structurants
                </h3>
                <p className="text-muted-foreground">
                  Participez à des réalisations qui marquent le territoire
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Progression rapide
                </h3>
                <p className="text-muted-foreground">
                  Évoluez dans une entreprise en forte croissance
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Expertise technique
                </h3>
                <p className="text-muted-foreground">
                  Développez vos compétences aux côtés d'experts
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg"
              >
                <Link href="/carriere" data-testid="button-view-job-offers">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Voir les offres d'emploi
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg"
              >
                <Link
                  href="/carriere#candidature-spontanee"
                  data-testid="button-spontaneous-application"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Candidature spontanée
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CareersSection