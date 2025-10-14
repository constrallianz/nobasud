'use client'

import { useState, useEffect } from 'react'
import { MapPinIcon } from '@heroicons/react/24/solid'

interface Location {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  order: number
  active: boolean
}

export default function AboutNumbers() {
  const stats = [
    {
      number: "250+",
      label: "Collaborateurs"
    },
    {
      number: "15+",
      label: "Projets réalisés"
    },
    {
      number: "8",
      label: "Régions couvertes"
    }
  ];

  // Default locations in Morocco - will be replaced by API data
  const defaultLocations: Location[] = [
    {
      id: '1',
      name: "Siège Agadir",
      address: "Boulevard Mohammed V",
      city: "Agadir",
      lat: 30.4278,
      lng: -9.5981,
      order: 1,
      active: true
    },
    {
      id: '2',
      name: "Bureau Casablanca",
      address: "Avenue Hassan II",
      city: "Casablanca",
      lat: 33.5731,
      lng: -7.5898,
      order: 2,
      active: true
    },
    {
      id: '3',
      name: "Antenne Marrakech",
      address: "Avenue Mohammed VI",
      city: "Marrakech",
      lat: 31.6295,
      lng: -7.9811,
      order: 3,
      active: true
    }
  ]

  const [locations, setLocations] = useState<Location[]>(defaultLocations)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/locations')
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setLocations(data)
            setSelectedLocation(data[0])
          } else {
            setSelectedLocation(defaultLocations[0])
          }
        } else {
          setSelectedLocation(defaultLocations[0])
        }
      } catch (error) {
        console.error('Error fetching locations:', error)
        setSelectedLocation(defaultLocations[0])
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  useEffect(() => {
    if (!selectedLocation && locations.length > 0) {
      setSelectedLocation(locations[0])
    }
  }, [locations, selectedLocation])

  // Calculate center and zoom to fit all markers
  const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length
  const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
            Une croissance maîtrisée, portée par le terrain
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Interactive Map Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                Notre présence territoriale
              </h3>
              <p className="text-muted-foreground mt-2">
                Nos bureaux et antennes à travers le Maroc
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-0">
              {/* Locations List */}
              <div className="md:col-span-1 bg-gray-50 dark:bg-gray-900/50 p-4 space-y-2 max-h-[400px] overflow-y-auto">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedLocation?.id === location.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPinIcon className={`w-5 h-5 mt-1 flex-shrink-0 ${
                        selectedLocation?.id === location.id ? 'text-white' : 'text-primary'
                      }`} />
                      <div>
                        <h4 className="font-semibold mb-1">{location.name}</h4>
                        <p className={`text-sm ${
                          selectedLocation?.id === location.id 
                            ? 'text-white/90' 
                            : 'text-muted-foreground'
                        }`}>
                          {location.address}
                        </p>
                        <p className={`text-xs mt-1 ${
                          selectedLocation?.id === location.id 
                            ? 'text-white/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {location.city}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Map */}
              <div className="md:col-span-2 h-[400px] relative">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                    selectedLocation ? `${selectedLocation.address}, ${selectedLocation.city}, Morocco` : 'Agadir, Morocco'
                  )}&zoom=14`}
                />
                
                {/* Location Info Overlay */}
                {selectedLocation && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <h4 className="font-bold text-primary mb-1">{selectedLocation.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                    <p className="text-sm text-muted-foreground">{selectedLocation.city}, Maroc</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}