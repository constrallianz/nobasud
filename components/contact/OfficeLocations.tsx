import { Button } from '@/components/ui/button'
import { Office } from '@/types/contact'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const offices: Office[] = [
  {
    city: 'Agadir - Siège Social',
    address: 'Quartier Industriel, Résidence Yasmine, 3ème Étage, Bloc B1, N° 24',
    phone: '+212 528-29975',
    email: 'contact@nobasud.com',
    hours: 'Lundi – Vendredi : 8h30 - 17h30',
    manager: 'Direction Générale',
    role: 'Siège social'
  }
]

export default function OfficeLocations() {
  return (
    <section id="bureaux" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Nos <span className="text-brand-orange">bureaux</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Retrouvez-nous dans nos bureaux régionaux pour un conseil personnalisé 
            et un suivi de proximité de votre projet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((office, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{office.city}</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-orange mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">{office.address}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <p className="text-gray-900 dark:text-gray-100 font-medium">{office.phone}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <p className="text-gray-900 dark:text-gray-100 font-medium">{office.email}</p>
                </div>

                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">{office.hours}</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{office.manager}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{office.role}</p>
                </div>
              </div>

              <Button className="w-full mt-6" variant="outline">
                <MapPinIcon className="w-4 h-4 mr-2" />
                Voir sur la carte
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
