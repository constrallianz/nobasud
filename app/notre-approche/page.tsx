import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Cog } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Notre approche | NOBASUD - Méthodologie BTP',
  description: 'NOBASUD développe une méthodologie éprouvée qui garantit la réussite de vos projets BTP. Notre approche intégrée combine expertise technique, gestion rigoureuse et engagement client.'
}

export default function Approach() {
  return (
    <div className="font-montserrat">
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-primary mb-6" data-testid="approach-title">
              Notre approche
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              NOBASUD développe une méthodologie éprouvée qui garantit la réussite de vos projets BTP. 
              Notre approche intégrée combine expertise technique, gestion rigoureuse et engagement client.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
              Une méthodologie éprouvée
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Analyse et planification stratégique
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Chaque projet commence par une analyse approfondie des besoins, des contraintes techniques et des enjeux territoriaux. 
                  Notre équipe d'experts élabore une stratégie sur mesure qui optimise les ressources et minimise les risques.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    Étude de faisabilité technique et économique
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    Planification des phases et des jalons
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    Anticipation des risques et contraintes
                  </li>
                </ul>
              </div>
              <div 
                className="h-96 bg-cover bg-center rounded-xl"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')" }}
              ></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div 
                className="h-96 bg-cover bg-center rounded-xl order-2 lg:order-1"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')" }}
              ></div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Exécution maîtrisée et suivi continu
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Notre force réside dans la coordination efficace des équipes et la maîtrise des processus d'exécution. 
                  Un suivi rigoureux garantit le respect des délais et de la qualité attendue.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    Coordination multi-corps d'état
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    Contrôle qualité à chaque étape
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    Reporting transparent et régulier
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
              Nos principes directeurs
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Collaboration étroite</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous privilégions un dialogue constant avec nos clients et partenaires pour garantir l'alignement sur les objectifs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Excellence opérationnelle</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Chaque détail compte. Notre obsession de la qualité se traduit par des livrables qui dépassent les attentes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Cog className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Innovation continue</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous investissons dans les technologies et méthodes les plus avancées pour optimiser nos performances.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
              Notre processus en 5 étapes
            </h2>
            
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { number: "01", title: "Analyse", description: "Étude approfondie des besoins et contraintes" },
                { number: "02", title: "Conception", description: "Élaboration de solutions techniques optimales" },
                { number: "03", title: "Planification", description: "Organisation des phases et ressources" },
                { number: "04", title: "Exécution", description: "Réalisation avec suivi qualité continu" },
                { number: "05", title: "Livraison", description: "Remise des ouvrages et accompagnement" }
              ].map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Safety */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-8">
              Qualité et sécurité au cœur de nos préoccupations
            </h2>
            <p className="text-lg mb-8 leading-relaxed opacity-90">
              NOBASUD s'engage à maintenir les plus hauts standards de qualité et de sécurité sur tous ses chantiers. 
              Nos certifications et notre engagement HSE garantissent des conditions de travail optimales.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Certifications qualité</h3>
                <p className="opacity-90">
                  Nos processus sont certifiés selon les standards internationaux pour garantir l'excellence de nos prestations.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Sécurité HSE</h3>
                <p className="opacity-90">
                  Formation continue des équipes et application stricte des protocoles de sécurité sur tous nos chantiers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-8">
              Prêt à démarrer votre projet avec NOBASUD ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez comment notre approche peut transformer vos ambitions en réalisations concrètes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <Link href="/contact" data-testid="button-contact-approach">
                  Discuter de votre projet
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
                <Link href="/realisations" data-testid="button-view-examples">
                  Voir nos exemples
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
