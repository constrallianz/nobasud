'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader'
import { MapPinIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

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

export default function LocationsPage() {
  const router = useRouter()
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    city: '',
    lat: '',
    lng: ''
  })

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const res = await fetch('/api/admin/locations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      if (res.ok) {
        const data = await res.json()
        setLocations(data)
      } else {
        setError('Erreur lors du chargement des emplacements')
      }
    } catch (err) {
      console.error('Error fetching locations:', err)
      setError('Erreur lors du chargement des emplacements')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (location: Location) => {
    setSaving(location.id)
    setError(null)
    setSuccess(null)

    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const res = await fetch('/api/admin/locations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(location)
      })

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      if (res.ok) {
        setSuccess('Emplacement mis à jour avec succès')
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Erreur lors de la mise à jour')
      }
    } catch (err) {
      console.error('Error updating location:', err)
      setError('Erreur lors de la mise à jour')
    } finally {
      setSaving(null)
    }
  }

  const handleAdd = async () => {
    if (!newLocation.name || !newLocation.address || !newLocation.city || !newLocation.lat || !newLocation.lng) {
      setError('Tous les champs sont requis')
      return
    }

    setSaving('new')
    setError(null)
    setSuccess(null)

    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const res = await fetch('/api/admin/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newLocation,
          order: locations.length + 1
        })
      })

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      if (res.ok) {
        setSuccess('Emplacement ajouté avec succès')
        setShowAddForm(false)
        setNewLocation({ name: '', address: '', city: '', lat: '', lng: '' })
        fetchLocations()
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Erreur lors de l\'ajout')
      }
    } catch (err) {
      console.error('Error adding location:', err)
      setError('Erreur lors de l\'ajout')
    } finally {
      setSaving(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet emplacement ?')) {
      return
    }

    setSaving(id)
    setError(null)
    setSuccess(null)

    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const res = await fetch(`/api/admin/locations?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      if (res.ok) {
        setSuccess('Emplacement supprimé avec succès')
        fetchLocations()
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Erreur lors de la suppression')
      }
    } catch (err) {
      console.error('Error deleting location:', err)
      setError('Erreur lors de la suppression')
    } finally {
      setSaving(null)
    }
  }

  const handleChange = (id: string, field: keyof Location, value: any) => {
    setLocations(prev =>
      prev.map(loc =>
        loc.id === id ? { ...loc, [field]: value } : loc
      )
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="p-8">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <MapPinIcon className="w-8 h-8 text-primary" />
                Gestion des emplacements
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Gérer les bureaux et antennes affichés sur la page À propos
              </p>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              Ajouter un emplacement
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Nouvel emplacement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-name">Nom</Label>
                    <Input
                      id="new-name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      placeholder="Ex: Siège Agadir"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-city">Ville</Label>
                    <Input
                      id="new-city"
                      value={newLocation.city}
                      onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                      placeholder="Ex: Agadir"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="new-address">Adresse</Label>
                    <Input
                      id="new-address"
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                      placeholder="Ex: Boulevard Mohammed V"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-lat">Latitude</Label>
                    <Input
                      id="new-lat"
                      type="number"
                      step="0.0001"
                      value={newLocation.lat}
                      onChange={(e) => setNewLocation({ ...newLocation, lat: e.target.value })}
                      placeholder="Ex: 30.4278"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-lng">Longitude</Label>
                    <Input
                      id="new-lng"
                      type="number"
                      step="0.0001"
                      value={newLocation.lng}
                      onChange={(e) => setNewLocation({ ...newLocation, lng: e.target.value })}
                      placeholder="Ex: -9.5981"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={handleAdd}
                    disabled={saving === 'new'}
                  >
                    {saving === 'new' ? 'Ajout...' : 'Ajouter'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setNewLocation({ name: '', address: '', city: '', lat: '', lng: '' })
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {locations.map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(location.id)}
                      disabled={saving === location.id}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${location.id}`}>Nom</Label>
                      <Input
                        id={`name-${location.id}`}
                        value={location.name}
                        onChange={(e) => handleChange(location.id, 'name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`city-${location.id}`}>Ville</Label>
                      <Input
                        id={`city-${location.id}`}
                        value={location.city}
                        onChange={(e) => handleChange(location.id, 'city', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`address-${location.id}`}>Adresse</Label>
                      <Input
                        id={`address-${location.id}`}
                        value={location.address}
                        onChange={(e) => handleChange(location.id, 'address', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`lat-${location.id}`}>Latitude</Label>
                      <Input
                        id={`lat-${location.id}`}
                        type="number"
                        step="0.0001"
                        value={location.lat}
                        onChange={(e) => handleChange(location.id, 'lat', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`lng-${location.id}`}>Longitude</Label>
                      <Input
                        id={`lng-${location.id}`}
                        type="number"
                        step="0.0001"
                        value={location.lng}
                        onChange={(e) => handleChange(location.id, 'lng', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => handleUpdate(location)}
                      disabled={saving === location.id}
                      className="w-full md:w-auto"
                    >
                      {saving === location.id ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {locations.length === 0 && !showAddForm && (
            <Card>
              <CardContent className="py-12 text-center">
                <MapPinIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Aucun emplacement n'est configuré pour le moment.
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Ajouter le premier emplacement
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
