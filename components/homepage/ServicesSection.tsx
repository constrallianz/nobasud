import { SERVICES } from '@/lib/constants'
import React from 'react'
import { Card, CardContent } from '../ui/card'

const ServicesSection = () => {
  return (
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
  )
}

export default ServicesSection