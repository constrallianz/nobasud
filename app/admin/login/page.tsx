'use client'

import LoginHeader from '@/components/admin/login/LoginHeader'
import LoginForm from '@/components/admin/login/LoginForm'
import { useAdminLogin } from '@/components/admin/login/useAdminLogin'

export default function AdminLoginPage() {
  const { formData, error, isLoading, handleSubmit, handleChange } = useAdminLogin()

  return (
    <div className="font-montserrat min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LoginHeader />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm
          formData={formData}
          error={error}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
