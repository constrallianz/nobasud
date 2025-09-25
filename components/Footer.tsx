import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-brand-blue flex items-center justify-center text-white font-bold">N</div>
            <h3 className="font-extrabold text-brand-blue text-lg">NOBASUD</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Les nouveaux bâtisseurs du Sud.</p>
          <address className="mt-4 text-sm text-gray-600 dark:text-gray-400 not-italic">
            <p>123 Avenue Mohammed V</p>
            <p>Casablanca, Maroc</p>
            <p className="mt-2">contact@nobasud.ma</p>
            <p>+212 522 000 000</p>
          </address>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Navigation</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/a-propos" className="hover:text-brand-orange transition-colors">À propos</Link></li>
            <li><Link href="/notre-approche" className="hover:text-brand-orange transition-colors">Notre approche</Link></li>
            <li><Link href="/realisations" className="hover:text-brand-orange transition-colors">Réalisations</Link></li>
            <li><Link href="/carriere" className="hover:text-brand-orange transition-colors">Carrières</Link></li>
            <li><Link href="/media" className="hover:text-brand-orange transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-brand-orange transition-colors">Mentions légales / RGPD</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Suivez-nous</h4>
          <div className="mt-4 space-y-3">
            <a
              className="inline-flex items-center gap-2 text-sm hover:text-brand-orange transition-colors"
              href="https://www.linkedin.com/"
              target="_blank" rel="noreferrer noopener"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 00.1.4V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
              LinkedIn
            </a>
          </div>
          
          <div className="mt-8">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Newsletter</h4>
            <form className="mt-2 flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 px-3 py-2 text-sm"
              />
              <button 
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} NOBASUD. Tous droits réservés.
      </div>
    </footer>
  )
}
