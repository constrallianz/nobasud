'use client'

import React, { useEffect, useState } from 'react'

interface Statistic {
  id: string
  value: string
  label: string
  order: number
}

const KeyNumbers = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch('/api/statistics')
        if (res.ok) {
          const data = await res.json()
          setStatistics(data)
        }
      } catch (error) {
        console.error('Error fetching statistics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <div className="text-xl opacity-90">Chargement...</div>
          </div>
        </div>
      </section>
    )
  }

  if (statistics.length === 0) {
    return null
  }

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

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {statistics.map((stat, index) => (
              <div key={stat.id} className="text-center">
                <div
                  className="text-5xl lg:text-6xl font-black text-accent mb-4"
                  data-testid={`stat-value-${index}`}
                >
                  {stat.value}
                </div>
                <div
                  className="text-lg font-semibold"
                  data-testid={`stat-label-${index}`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default KeyNumbers