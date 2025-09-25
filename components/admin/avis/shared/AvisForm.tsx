'use client'

import { useState, FormEvent, useRef } from 'react'
import { XMarkIcon, FolderOpenIcon, StarIcon } from '@heroicons/react/24/outline'
import { type Feedback } from '@/lib/validations'

interface AvisFormProps {
  initialData?: Partial<Feedback>
  onSubmit: (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  isSubmitting: boolean
  submitButtonText: string
}

export default function AvisForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText
}: AvisFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    company: initialData?.company || '',
    project: initialData?.project || '',
    rating: initialData?.rating || 5,
    message: initialData?.message || '',
    published: initialData?.published ?? false,
    photoUrl: initialData?.photoUrl || ''
  })

  const [isAnonymous, setIsAnonymous] = useState(initialData?.name === 'Anonyme')
  const [selectedImage, setSelectedImage] = useState<string | null>(initialData?.photoUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const finalFormData = {
      ...formData,
      name: isAnonymous ? 'Anonyme' : formData.name,
      photoUrl: selectedImage || undefined
    }
    await onSubmit(finalFormData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
        setFormData(prev => ({ ...prev, photoUrl: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = (url: string) => {
    setSelectedImage(url)
    setFormData(prev => ({ ...prev, photoUrl: url }))
  }

  const removeImage = () => {
    setSelectedImage(null)
    setFormData(prev => ({ ...prev, photoUrl: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            className={`p-1 transition-colors ${
              star <= formData.rating
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <StarIcon className={`w-6 h-6 ${star <= formData.rating ? 'fill-current' : ''}`} />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {formData.rating}/5 étoiles
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informations personnelles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Informations personnelles
        </h3>
        
        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <label htmlFor="anonymous-toggle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Témoignage anonyme
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Le nom apparaîtra comme "Anonyme" si activé
            </p>
          </div>
          <input
            id="anonymous-toggle"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="sr-only"
          />
          <div
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
              isAnonymous ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnonymous ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom complet *
            </label>
            <input
              id="name"
              type="text"
              value={isAnonymous ? 'Anonyme' : formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              disabled={isAnonymous}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 ${
                isAnonymous ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 cursor-not-allowed' : ''
              }`}
              required={!isAnonymous}
            />
            {isAnonymous && (
              <p className="text-xs text-gray-500 mt-1">
                Le nom sera affiché comme "Anonyme" sur le site
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Entreprise
            </label>
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Projet *
            </label>
            <input
              id="project"
              type="text"
              value={formData.project}
              onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>
        </div>
      </div>

      {/* Évaluation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Évaluation
        </h3>
        <div className="space-y-4">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Note *
            </legend>
            {renderStarRating()}
          </fieldset>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message/Témoignage *
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical dark:bg-gray-700 dark:text-gray-100"
              placeholder="Partagez votre expérience avec NOBASUD..."
              required
            />
          </div>
        </div>
      </div>

      {/* Photo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Photo (optionnelle)
        </h3>
        
        {/* Image URL Input */}
        <div className="mb-4">
          <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL de l'image
          </label>
          <input
            id="photoUrl"
            type="url"
            value={formData.photoUrl}
            onChange={(e) => handleImageUrlChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ou télécharger une image
          </label>
          <div className="flex items-center gap-3">
            <input
              id="fileUpload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FolderOpenIcon className="w-4 h-4 mr-2" />
              Choisir une image
            </button>
          </div>
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="relative inline-block">
            <img
              src={selectedImage}
              alt="Aperçu"
              className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Publication */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Publication
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Publier cet avis sur le site web
          </label>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Si coché, cet avis sera visible par les visiteurs du site
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-orange disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'En cours...' : submitButtonText}
        </button>
      </div>
    </form>
  )
}