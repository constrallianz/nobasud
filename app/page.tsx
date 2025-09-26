"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Users, Rocket, MapPin, Trophy, TrendingUp, Briefcase, Send, ChevronDown } from "lucide-react";
import { COMPANY_INFO, COMPANY_VALUES, SERVICES, KEY_NUMBERS, SAMPLE_PROJECTS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="font-montserrat">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 hero-bg"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight" data-testid="hero-title">
            {COMPANY_INFO.slogan}
          </h1>
          <p className="text-xl lg:text-2xl mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
            Acteur engagé du secteur BTP au Maroc, NOBASUD porte une vision ambitieuse : bâtir des infrastructures pérennes qui améliorent la vie des citoyens.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-muted font-bold text-lg shadow-lg">
              <Link href="/a-propos" data-testid="button-discover-company">
                <Building className="mr-2 h-5 w-5" />
                Découvrir NOBASUD
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg shadow-lg">
              <Link href="/carriere" data-testid="button-apply-job">
                <Users className="mr-2 h-5 w-5" />
                Postuler
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6" data-testid="values-title">
              Nos engagements structurent notre quotidien
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre approche repose sur l'excellence opérationnelle, l'engagement humain et une profonde connaissance du terrain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {COMPANY_VALUES.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    {value.icon === "handshake" && <Building className="h-8 w-8 text-primary" />}
                    {value.icon === "rocket" && <Rocket className="h-8 w-8 text-accent" />}
                    {value.icon === "map-marker-alt" && <MapPin className="h-8 w-8 text-primary" />}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6" data-testid="services-title">
              Nos métiers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              NOBASUD intervient sur toute la chaîne de valeur du BTP, du gros œuvre à l'aménagement final des espaces.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {SERVICES.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${service.image}')` }}
                >
                  <div className="absolute inset-0 gradient-overlay flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-lg">{service.subtitle}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-muted-foreground">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Numbers Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6" data-testid="numbers-title">
              Une croissance maîtrisée, portée par le terrain
            </h2>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Depuis sa création, NOBASUD s'impose comme un partenaire de confiance avec des résultats concrets.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {KEY_NUMBERS.map((number, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl lg:text-6xl font-black text-accent mb-4" data-testid={`stat-value-${index}`}>
                  {number.value}
                </div>
                <div className="text-lg font-semibold" data-testid={`stat-label-${index}`}>
                  {number.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6" data-testid="projects-title">
              Nos réalisations récentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un portefeuille de réalisations à forte valeur structurante dans les régions du Sud et au-delà.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {SAMPLE_PROJECTS.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${project.image}')` }}
                ></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {project.type}
                    </span>
                    <span className="text-muted-foreground text-sm">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.name}</h3>
                  <p className="text-muted-foreground text-sm">{project.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg">
              <Link href="/realisations" data-testid="button-view-all-projects">
                <Building className="mr-2 h-5 w-5" />
                Voir toutes nos réalisations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6" data-testid="careers-title">
              Rejoignez les bâtisseurs du Sud
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Chez NOBASUD, nous croyons au potentiel humain et à l'engagement local. Rejoignez une entreprise en pleine croissance, au cœur des projets qui façonnent le Maroc de demain.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Projets structurants</h3>
                <p className="text-muted-foreground">Participez à des réalisations qui marquent le territoire</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Progression rapide</h3>
                <p className="text-muted-foreground">Évoluez dans une entreprise en forte croissance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Expertise technique</h3>
                <p className="text-muted-foreground">Développez vos compétences aux côtés d'experts</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg">
                <Link href="/carriere" data-testid="button-view-job-offers">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Voir les offres d'emploi
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg">
                <Link href="/carriere#candidature-spontanee" data-testid="button-spontaneous-application">
                  <Send className="mr-2 h-5 w-5" />
                  Candidature spontanée
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
