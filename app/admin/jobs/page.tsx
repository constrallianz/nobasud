'use client'
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function AdminJobs() {
  const { data, mutate } = useSWR('/api/admin/jobs', fetcher)

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-blue">Offres d'emploi</h1>
        <Link href="/admin/jobs/new">
          <Button>Ajouter une offre</Button>
        </Link>
      </div>
      
      {data?.items?.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          Aucune offre d'emploi pour le moment. Cliquez sur "Ajouter" pour créer votre première offre.
        </p>
      )}
      
      <ul className="mt-6 space-y-3">
        {(data?.items || []).map((job: any) => (
          <li key={job.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-medium">{job.title}</h2>
                <div className="flex gap-2 mt-1">
                  {job.department && (
                    <p className="text-sm text-gray-500">Département: {job.department}</p>
                  )}
                  {job.location && (
                    <p className="text-sm text-gray-500">Lieu: {job.location}</p>
                  )}
                  <span className={`text-sm px-2 py-0.5 rounded-full ${job.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {job.published ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/jobs/${job.id}`}>
                  <Button variant="outline" size="sm">Modifier</Button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}rt useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function AdminJobs() {
  const { data } = useSWR('/api/admin/jobs', fetcher)
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-extrabold text-brandBlue">Offres d’emploi</h1>
      <ul className="mt-6 space-y-2">
        {(data?.items || []).map((j: any) => (
          <li key={j._id} className="border rounded p-3">{j.title}</li>
        ))}
      </ul>
    </div>
  )
}
