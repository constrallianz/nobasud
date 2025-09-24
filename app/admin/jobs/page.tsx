'use client'

import AuthGuard from '@/components/AuthGuard'
import { JobPageHeader } from '@/components/admin/jobs/jobs-listing/JobPageHeader'
import { JobStats } from '@/components/admin/jobs/jobs-listing/JobStats'
import { JobCard } from '@/components/admin/jobs/jobs-listing/JobCard'
import { LoadingState, EmptyState, JobsList } from '@/components/admin/jobs/jobs-listing/JobPageStates'
import { useJobs } from '@/components/admin/jobs/jobs-listing/useJobs'
import { useRouter } from 'next/navigation'

export default function JobsAdminPage() {
  const {
    jobs,
    loading,
    error,
    handleView,
    handleDelete
  } = useJobs()
  const router = useRouter()

  const handleEdit = async (id:string) =>{
    router.push('/admin/jobs/edit/'+id)
  }

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <JobPageHeader totalJobs={jobs.length} />

        <div className="px-6 py-8">
          {/* Stats */}
          <JobStats jobs={jobs} />

          {/* Jobs List */}
          {jobs.length > 0 ? (
            <JobsList>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onView={handleView}
                  handleEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </JobsList>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
