import { useState } from 'react'

interface JobFormData {
  title: string
  department: string
  location: string
  type: string
  experience: string
  education: string
  description: string
  requirements: string
  benefits: string
  salary: string
  deadline: string
}

export function useJobForm() {
  const [formData, setFormData] = useState<JobFormData>({
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<JobFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof JobFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<JobFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre du poste est requis'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Le département est requis'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise'
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Le type de contrat est requis'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description du poste est requise'
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Les exigences sont requises'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // In a real app, this would call an API to create the job
      console.log('Nouvelle offre d\'emploi:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form on success
      setFormData({
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
      
      // Show success message or redirect
      alert('Offre d\'emploi créée avec succès!')
      
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Erreur lors de la création de l\'offre')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
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
    setErrors({})
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    validateForm
  }
}