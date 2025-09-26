import { KEY_NUMBERS } from '@/lib/constants'
import React from 'react'

const KeyNumbers = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-black mb-6"
              data-testid="numbers-title"
            >
              Une croissance maîtrisée, portée par le terrain
            </h2>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Depuis sa création, NOBASUD s'impose comme un partenaire de
              confiance avec des résultats concrets.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {KEY_NUMBERS.map((number: { value: string; label: string }, index: number) => (
              <div key={index} className="text-center">
                <div
                  className="text-5xl lg:text-6xl font-black text-accent mb-4"
                  data-testid={`stat-value-${index}`}
                >
                  {number.value}
                </div>
                <div
                  className="text-lg font-semibold"
                  data-testid={`stat-label-${index}`}
                >
                  {number.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default KeyNumbers