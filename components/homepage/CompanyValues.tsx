import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Building, MapPin, Rocket } from 'lucide-react'
import { COMPANY_VALUES } from '@/data/constants'

const CompanyValues = () => {
  return (
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
                {COMPANY_VALUES.map((value, index:number) => (
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
  )
}

export default CompanyValues