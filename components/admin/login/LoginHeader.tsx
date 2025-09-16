import { LockClosedIcon } from '@heroicons/react/24/outline'

export default function LoginHeader() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center">
          <LockClosedIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
        Administration NOBASUD
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Connectez-vous pour accéder au panneau d'administration
      </p>
    </div>
  )
}