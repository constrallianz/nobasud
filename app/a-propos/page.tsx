import { Building, Eye, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'À propos | NOBASUD - Excellence en Construction et Aménagement',
  description: 'Acteur engagé du secteur BTP au Maroc, NOBASUD porte une vision ambitieuse : bâtir des infrastructures pérennes qui améliorent la vie des citoyens et accompagnent le développement des territoires.'
}

export default function About() {
  return (
    <div className="font-montserrat">
      {/* Hero Section */}
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

      {/* Company Identity */}
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

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
              Nos engagements structurent notre quotidien
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                    <Building className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Excellence technique</h3>
                  <p className="text-muted-foreground">
                    Nous mettons notre expertise au service de projets d'envergure, en respectant les plus hauts standards de qualité et de sécurité.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                    <Eye className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Vision territoriale</h3>
                  <p className="text-muted-foreground">
                    Notre ancrage local nous permet de comprendre les enjeux spécifiques de chaque région et d'adapter nos solutions en conséquence.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Proximité client</h3>
                  <p className="text-muted-foreground">
                    Nous cultivons une relation de confiance avec nos clients, basée sur l'écoute, la transparence et la réactivité.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-12">
              Notre Manifesto
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="font-bold text-xl">Nous sommes NOBASUD.</p>
              
              <p>
                Nous sommes issus d'une terre, d'une famille, et d'un métier transmis, vécu, et respecté. 
                Nous concevons chaque projet comme une réponse concrète aux besoins des collectivités, des habitants et des territoires.
              </p>
              
              <p>
                À travers la rigueur, l'expertise technique et la proximité terrain, nous accompagnons nos clients sur l'ensemble de la chaîne de valeur du BTP : 
                gros œuvre, voirie, aménagements urbains, VRD, gestion de projets clés en main.
              </p>
              
              <p>
                Nous proposons un service complet et intégré, de l'étude à la livraison, pour garantir la maîtrise des délais, des budgets et des standards de qualité.
              </p>
              
              <p className="text-accent font-semibold">
                L'authenticité est notre socle et la modernité est notre moteur.
              </p>
              
              <p>
                Nous investissons dans les méthodes, les outils, les talents et les matériaux qui permettent à nos équipes de livrer des chantiers plus performants, plus sûrs, plus durables.
              </p>
              
              <p>
                Satisfaire nos clients, tenir nos engagements, construire avec sérieux et respect : voilà notre promesse.
              </p>
              
              <p className="font-bold text-xl text-accent">
                Nous sommes NOBASUD. Et nous construisons ce qui compte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
              Une croissance maîtrisée, portée par le terrain
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">250+</div>
                <p className="text-muted-foreground">Collaborateurs</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">75+</div>
                <p className="text-muted-foreground">Projets réalisés</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">8</div>
                <p className="text-muted-foreground">Régions couvertes</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Satisfaction client</p>
              </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-8">
              Vous souhaitez collaborer avec NOBASUD ?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-semibold">
                Nous contacter
              </Button>
              <Button variant="outline" size="lg" className="font-semibold">
                Découvrir nos réalisations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
