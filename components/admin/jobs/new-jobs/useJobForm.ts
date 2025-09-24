import { useState } from 'react'
import { useJobs } from '../jobs-listing/useJobs'
import { JobFormData } from '@/types/career';

const initialState : JobFormData = {
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
      deadline: '',
      imageFile: undefined,
      
    }

export function useJobForm() {
  const handleFileChange = (file?: File) => {
    setFormData(prev => ({
      ...prev,
      imageFile: file
    }));
  };
  const { submitJob } = useJobs();
  const [formData, setFormData] = useState<JobFormData>(initialState)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<JobFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
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
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  try {
    await submitJob(formData);

    setFormData(initialState)
    alert("Offre d'emploi créée avec succès!");
  } catch (err) {
    console.error('Erreur lors de la création:', err);
    alert("Erreur lors de la création de l'offre");
  } finally {
    setIsSubmitting(false);
  }
};


  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleSubmit,
    resetForm,
    validateForm
  }
}