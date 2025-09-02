'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

export default function NewJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'CDI',
    experience: '',
    education: '',
    description: '',
    requirements: '',
    benefits: '',
    salary: '',
    deadline: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici on ferait l'appel API pour créer l'offre
    console.log('Nouvelle offre d\'emploi:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/jobs">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Retour</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle offre d'emploi</h1>
          <p className="text-gray-600">Créer une nouvelle offre d'emploi</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du poste *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="ex: Ingénieur Civil Senior"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Département *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                required
              >
                <option value="">Sélectionner un département</option>
                <option value="Ingénierie">Ingénierie</option>
                <option value="Construction">Construction</option>
                <option value="Architecture">Architecture</option>
                <option value="Gestion de projet">Gestion de projet</option>
                <option value="Administration">Administration</option>
                <option value="Ressources humaines">Ressources humaines</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="ex: Agadir, Maroc"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de contrat *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                required
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expérience requise
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="ex: 3-5 ans"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau d'éducation
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="ex: Master en Génie Civil"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salaire (optionnel)
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="ex: 15 000 - 20 000 MAD"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date limite de candidature
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description du poste *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              placeholder="Décrivez en détail les responsabilités et missions du poste..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exigences et qualifications *
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              placeholder="Listez les compétences requises, qualifications, etc..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avantages (optionnel)
            </label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              placeholder="Décrivez les avantages offerts par le poste..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Link href="/admin/jobs">
              <Button variant="outline">
                Annuler
              </Button>
            </Link>
            <Button type="submit" className="flex items-center space-x-2">
              <BriefcaseIcon className="w-4 h-4" />
              <span>Créer l'offre</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
