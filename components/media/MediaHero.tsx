import { Input } from '@/components/ui/input'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { MediaHeroProps } from '@/types/media'

export default function MediaHero({ searchTerm, onSearchChange }: MediaHeroProps) {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Blog & <span className="text-brand-orange">Actualités</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            Restez informé des dernières actualités, innovations et projets 
            de NOBASUD dans le secteur du BTP au Maroc.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 py-4 text-gray-900 dark:text-gray-100 text-lg"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
