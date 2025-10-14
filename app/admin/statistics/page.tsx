'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader'
import { ChartBarIcon } from '@heroicons/react/24/outline'

interface Statistic {
  id: string
  key: string
  value: string
  label: string
  order: number
  active: boolean
}

export default function StatisticsPage() {
  const router = useRouter()
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const res = await fetch('/api/admin/statistics', {
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
        setStatistics(data)
      } else {
        setError('Erreur lors du chargement des statistiques')
      }
    } catch (err) {
      console.error('Error fetching statistics:', err)
      setError('Erreur lors du chargement des statistiques')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (stat: Statistic) => {
    setSaving(stat.id)
    setError(null)
    setSuccess(null)

    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const res = await fetch('/api/admin/statistics', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: stat.id,
          value: stat.value,
          label: stat.label
        })
      })

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      if (res.ok) {
        setSuccess('Statistique mise à jour avec succès')
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Erreur lors de la mise à jour')
      }
    } catch (err) {
      console.error('Error updating statistic:', err)
      setError('Erreur lors de la mise à jour')
    } finally {
      setSaving(null)
    }
  }

  const handleChange = (id: string, field: 'value' | 'label', newValue: string) => {
    setStatistics(prev => 
      prev.map(stat => 
        stat.id === id ? { ...stat, [field]: newValue } : stat
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <ChartBarIcon className="w-8 h-8 text-primary" />
              Gestion des statistiques
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Modifier les statistiques affichées sur la page d'accueil
            </p>
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

          <div className="space-y-6">
            {statistics.map((stat) => (
              <Card key={stat.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{stat.key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`value-${stat.id}`}>Valeur</Label>
                      <Input
                        id={`value-${stat.id}`}
                        value={stat.value}
                        onChange={(e) => handleChange(stat.id, 'value', e.target.value)}
                        placeholder="Ex: 15+"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`label-${stat.id}`}>Label</Label>
                      <Input
                        id={`label-${stat.id}`}
                        value={stat.label}
                        onChange={(e) => handleChange(stat.id, 'label', e.target.value)}
                        placeholder="Ex: Années d'expérience"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => handleUpdate(stat)}
                      disabled={saving === stat.id}
                      className="w-full md:w-auto"
                    >
                      {saving === stat.id ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {statistics.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <ChartBarIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Aucune statistique n'est configurée pour le moment.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
