'use client'
import AuthGuard from '@/components/AuthGuard'
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader'
import DashboardStats from '@/components/admin/dashboard/DashboardStats'
import QuickActions from '@/components/admin/dashboard/QuickActions'
import AdminModules from '@/components/admin/dashboard/AdminModules'
import useDashboard from '@/components/admin/dashboard/useDashboard'

export default function AdminDashboard() {
  const { stats, loading, error, refreshData } = useDashboard()

  if (error) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Erreur</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button 
              onClick={refreshData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <DashboardHeader />
        
        <div className="px-6 pt-2 pb-8">
          <DashboardStats stats={stats} loading={loading} />
          
          <div className="mb-8">
            <QuickActions />
          </div>

          <AdminModules stats={stats} loading={loading} />
        </div>
      </div>
    </AuthGuard>
  )
}
