'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type Feedback } from '@/lib/validations'

interface AvisFormProps {
  initialData: Feedback
  onSubmit: (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
  mode: 'edit'
}

export function AvisForm({ initialData, onSubmit, onCancel, isSubmitting, mode }: AvisFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name,
    email: initialData.email,
    company: initialData.company || '',
    project: initialData.project,
    rating: initialData.rating,
    message: initialData.message,
    photoUrl: initialData.photoUrl || '',
    published: initialData.published
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.photoUrl || null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      handleChange('photoUrl', '') // Clear URL when file is selected
    }
  }

  const handleImageUrlChange = (url: string) => {
    handleChange('photoUrl', url)
    if (url) {
      setSelectedFile(null) // Clear file when URL is entered
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!formData.project.trim()) newErrors.project = 'Le projet est requis'
    if (!formData.message.trim()) newErrors.message = 'Le message est requis'
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = 'La note doit être entre 1 et 5'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      let finalImageUrl = formData.photoUrl

      // If a file is selected, upload it first
      if (selectedFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', selectedFile)
        uploadFormData.append('type', 'feedback-image')

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Erreur lors du téléchargement de l\'image')
        }

        const uploadResult = await uploadResponse.json()
        finalImageUrl = uploadResult.url
      }

      await onSubmit({
        ...formData,
        photoUrl: finalImageUrl
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Erreur lors de la soumission du formulaire' })
    }
  }

  const renderStarRating = () => (
    <div className="flex flex-col space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Note <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleChange('rating', star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            className={`w-8 h-8 text-2xl transition-colors ${
              star <= (hoveredStar || formData.rating)
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            } hover:text-yellow-400`}
          >
            ★
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {formData.rating > 0 ? `${formData.rating}/5 étoiles` : 'Cliquez pour noter'}
      </span>
      {errors.rating && <p className="text-sm text-red-600">{errors.rating}</p>}
    </div>
  )

  const renderImageUpload = () => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Image
      </label>
      
      {/* URL Input */}
      <div>
        <Input
          type="url"
          placeholder="URL de l'image (optionnel)"
          value={formData.photoUrl}
          onChange={(e) => handleImageUrlChange(e.target.value)}
          className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* File Upload */}
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="dark:bg-gray-800 dark:border-gray-600 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ou téléchargez un fichier image
        </p>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Aperçu"
            className="max-w-xs max-h-48 object-cover rounded border dark:border-gray-600"
          />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(null)
              setSelectedFile(null)
              handleChange('photoUrl', '')
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            Supprimer l'image
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nom <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Nom du client"
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="email@exemple.com"
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Entreprise
          </label>
          <Input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Nom de l'entreprise (optionnel)"
          />
        </div>

        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Projet <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.project}
            onChange={(e) => handleChange('project', e.target.value)}
            className={`dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.project ? 'border-red-500' : ''
            }`}
            placeholder="Nom du projet"
            required
          />
          {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project}</p>}
        </div>

        {/* Rating */}
        {renderStarRating()}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
            className={`dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.message ? 'border-red-500' : ''
            }`}
            placeholder="Votre témoignage..."
            required
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        {/* Image Upload */}
        {renderImageUpload()}

        {/* Published Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => handleChange('published', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Publier cet avis
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
          </Button>
        </div>
      </form>
    </div>
  )
}