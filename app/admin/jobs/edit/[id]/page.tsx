"use client";

import { useRouter, useParams } from "next/navigation";
import { JobFormHeader } from "@/components/admin/jobs/new-jobs/JobFormHeader";
import { JobBasicInfo } from "@/components/admin/jobs/new-jobs/JobBasicInfo";
import { JobDescriptionFields } from "@/components/admin/jobs/new-jobs/JobDescriptionFields";
import { JobFormActions } from "@/components/admin/jobs/new-jobs/JobFormActions";
import { useEffect, useState } from "react";
import { useJobs } from "@/components/admin/jobs/jobs-listing/useJobs";

export default function EditJobPage() {
  const { loading, error, fetchJobById, updateJob } = useJobs();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (jobId) {
      fetchJobById(jobId).then((data) => {
       if (data) {
            setFormData({
                ...data,
                deadline: data.deadline ? data.deadline.split('T')[0] : ''
            });
            }
      });
    }
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file?: File) => {
    setFormData((prev: any) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateJob(jobId, formData);
      router.push("/admin/jobs");
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !formData) {
    return <div>Chargement...</div>;
  }
  if (error) {
    return <div>Erreur: {error}</div>;
  }
  return (
    <div className="space-y-8">
      <JobFormHeader
        title={`Modifier: ${formData.title}`}
        subtitle="Modifier une offre d'emploi"
        backLink="/admin/jobs"
      />
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <JobBasicInfo
            formData={formData}
            onChange={handleChange}
            onFileChange={handleFileChange}
          />
          <JobDescriptionFields formData={formData} onChange={handleChange} />
          <JobFormActions
            cancelLink="/admin/jobs"
            submitLabel="Mettre à jour l'offre"
            isSubmitting={isSubmitting}
            onCancel={() => router.push("/admin/jobs")}
          />
        </form>
      </div>
    </div>
  );
}
