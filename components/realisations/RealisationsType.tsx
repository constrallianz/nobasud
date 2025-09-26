import React from 'react'
import { Card, CardContent } from '../ui/card'
import { projetRealise } from '@/data/realisations'

const RealisationsType = () => {
  return (
       <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
              Types de projets réalisés
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projetRealise.map((item:any, index:number) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-black text-primary mb-2">{item.count}</div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default RealisationsType