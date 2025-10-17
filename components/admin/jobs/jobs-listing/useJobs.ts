import { Job, JobFormData } from '@/types/career';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';



export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs (${response.status})`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('Unexpected API response format:', data);
        setError('Invalid data format received');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };
  const fetchJobById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/jobs/${id}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`Failed to fetch job (${response.status})`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

 const submitJob = async (jobData: JobFormData): Promise<Job> => {
    const fd = new FormData()
    if (jobData.imageFile instanceof File) fd.append('image', jobData.imageFile)

    Object.entries(jobData).forEach(([key, value]) => {
      if (key === 'imageFile') return
      if (value !== undefined && value !== null) fd.append(key, String(value))
    })

    const res = await fetch('/api/admin/jobs', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Failed to create job')
    const newJob = (await res.json()) as Job
    return newJob
  }

  const handleView = (job: Job) => {
    fetch(`/api/admin/jobs/${job.id}`)
      .then(res => res.json())
      .then(data => {
       router.push(`/admin/jobs/${data.id}`);
      })
      .catch(err => {
        console.error('Error viewing job:', err);
      });
  }

  const updateJob = async (jobId: string, jobData: JobFormData): Promise<Job> => {
    const fd = new FormData()
    if (jobData.imageFile instanceof File) fd.append('image', jobData.imageFile)
    Object.entries(jobData).forEach(([key, value]) => {
      if (key === 'imageFile') return
      if (value !== undefined && value !== null) fd.append(key, String(value))
    })
    const res = await fetch(`/api/admin/jobs/${jobId}`, 
      { method: 'PUT', body: fd })
    if (!res.ok) throw new Error('Failed to update job')
    const updatedJob = (await res.json()) as Job
    return updatedJob
  }

  const handleEdit = async (jobId: string, jobData: JobFormData) => {
    try {
      await updateJob(jobId, jobData)
    } catch (err) {
      console.error('Error editing job:', err)
    }
  }

  const handleDelete = (job: Job) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'offre "${job.title}" ?`)) {
      deleteJob(job.id)
    }
  }

  const deleteJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (error) {
      alert('Erreur lors de la suppression de l\'offre');
    }
  }

  const refreshJobs = () => {
    fetchJobs()
  }

  return {
    jobs,
    loading,
    error,
    submitJob,
    updateJob,
    handleView,
    handleEdit,
    handleDelete,
    refreshJobs,
    fetchJobById
  }
}