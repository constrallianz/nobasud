'use client'

import { useState, FormEvent, useRef } from 'react'
import { PhotoIcon, XMarkIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import { type Project } from '@/lib/validations'

interface ProjectFormProps {
  initialData?: Partial<Project>
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  isSubmitting: boolean
  submitButtonText: string
}

export default function ProjectForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    type: initialData?.type || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    images: initialData?.images || []
  })

  const [newImageUrl, setNewImageUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Générer automatiquement le slug à partir du nom
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõöø]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }))
  }

  const addImage = (e?: React.MouseEvent) => {
    e?.preventDefault() // Prevent form submission
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImageUrl.trim()]
      }))
      setNewImageUrl('')
    }
  }

  const handleFileUpload = (e?: React.MouseEvent) => {
    e?.preventDefault()
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a temporary URL for preview (in production, you'd upload to a server)
      const fileUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), fileUrl]
      }))
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
      // Note: In a real application, you would upload the file to a server here
      // and use the returned URL instead of the local object URL
    }
  }

  const handleImageUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addImage()
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du projet *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug (URL)
            </label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Generated automatically"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type de projet *
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un type</option>
              <option value="bâtiment">Bâtiment</option>
              <option value="voirie">Voirie</option>
              <option value="terrassement">Terrassement</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="travaux-publics">Travaux Publics</option>
              <option value="assainissement">Assainissement</option>
              <option value="rehabilitation">Réhabilitation</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Localisation
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ville, Région"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description détaillée du projet..."
          />
        </div>
      </div>

      {/* Section Images */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Images du projet</h2>
        
        <div className="space-y-4">
          {/* Add new image via URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ajouter via URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={handleImageUrlKeyDown}
                placeholder="URL de l'image"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <PhotoIcon className="h-4 w-4" />
                Ajouter URL
              </button>
            </div>
          </div>

          {/* Add new image via file upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ou télécharger un fichier
            </label>
            <button
              type="button"
              onClick={handleFileUpload}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <FolderOpenIcon className="h-4 w-4" />
              Choisir un fichier
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Images list */}
          {formData.images && formData.images.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Images ajoutées:</h3>
              {formData.images.map((imageUrl, index) => (
                <div key={`image-${imageUrl}-${index}`} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <img 
                    src={imageUrl} 
                    alt={`Projet ${index + 1}`}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-image.jpg'
                    }}
                  />
                  <span className="flex-1 text-sm text-gray-600 truncate">{imageUrl}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'En cours...' : submitButtonText}
        </button>
      </div>
    </form>
  )
}