import './globals.css'
import type { Metadata } from 'next'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import AdminIndicator from '../components/AdminIndicator'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','600','700','800'] })

export const metadata: Metadata = {
  title: 'NOBASUD — Les nouveaux bâtisseurs du Sud',
  description: 'NOBASUD, acteur BTP et aménagement au Maroc. Réalisations, carrières, actualités, et feedback citoyen.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${montserrat.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AdminIndicator />
      </body>
    </html>
  )
}
