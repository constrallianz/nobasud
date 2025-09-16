export default function TestCredentials() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Identifiants de test</span>
        </div>
      </div>
      <div className="mt-3 text-center text-xs text-gray-500">
        <p>Utilisateur: <span className="font-mono font-semibold">admin</span></p>
        <p>Mot de passe: <span className="font-mono font-semibold">123456</span></p>
      </div>
    </div>
  )
}