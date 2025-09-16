'use client'
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader'
import DashboardStats from '@/components/admin/dashboard/DashboardStats'
import QuickActions from '@/components/admin/dashboard/QuickActions'
import AdminModules from '@/components/admin/dashboard/AdminModules'
import useDashboard from '@/components/admin/dashboard/useDashboard'

export default function AdminDashboard() {
  const { stats, loading, error, refreshData } = useDashboard()

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader variant="new" />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <DashboardStats stats={stats} loading={loading} variant="new" />
        
        <QuickActions variant="new" />
        
        <AdminModules stats={stats} loading={loading} variant="new" />
      </div>
    </div>
  )
}
