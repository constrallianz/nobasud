import { ContactInfo } from '@/types/contact'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const contactInfo: ContactInfo[] = [
  {
    icon: PhoneIcon,
    title: 'Téléphone',
    info: '+212 528-29975',
    description: 'Appelez-nous pour un devis gratuit'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    info: 'contact@nobasud.com',
    description: 'Nous répondons sous 24h'
  },
  {
    icon: MapPinIcon,
    title: 'Siège social',
    info: 'Agadir, Maroc',
    description: 'Quartier Industriel, Résidence Yasmine'
  },
  {
    icon: GlobeAltIcon,
    title: 'Zone d\'intervention',
    info: 'Tout le Maroc',
    description: 'Service national disponible'
  }
]

export default function ContactInfoCards() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Informations de <span className="text-brand-orange">contact</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Plusieurs moyens pour nous joindre et démarrer votre projet avec NOBASUD.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, i) => {
            const IconComponent = info.icon
            return (
              <div key={i} className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-brand-blue mb-2">{info.info}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{info.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
