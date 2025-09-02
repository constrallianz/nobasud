'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)

  const offices = [
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

  const contactInfo = [
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      if (res.ok) {
        e.currentTarget.reset()
        alert('Message envoyé avec succès ! Nous vous recontacterons rapidement.')
      } else {
        alert('Erreur lors de l\'envoi. Veuillez réessayer.')
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    }
    
    setSubmitting(false)
  }

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contactez <span className="text-brand-orange">NOBASUD</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              Discutons de votre projet et trouvons ensemble les meilleures solutions 
              pour vos besoins en construction et aménagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="inline-block">
                <Button size="lg" className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-8 py-4 text-lg">
                  Nous contacter
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#bureaux" className="inline-block">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue px-8 py-4 text-lg">
                  Nos bureaux
                  <MapPinIcon className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
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

      {/* Contact form */}
      <section id="contact" className="py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Demandez votre <span className="text-brand-orange">devis</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Décrivez-nous votre projet et recevez une estimation personnalisée 
                sous 48h. Tous nos devis sont gratuits et sans engagement.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact form */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Formulaire de contact</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom complet *
                      </label>
                      <Input name="name" required placeholder="Votre nom et prénom" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input name="email" type="email" required placeholder="votre@email.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Téléphone
                      </label>
                      <Input name="phone" placeholder="+212 6XX XXX XXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type de projet *
                      </label>
                      <select 
                        name="projectType" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      >
                        <option value="">Sélectionnez un type</option>
                        <option value="batiment">Construction de bâtiments</option>
                        <option value="infrastructure">Infrastructure routière</option>
                        <option value="amenagement">Aménagement urbain</option>
                        <option value="renovation">Rénovation</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget estimé
                    </label>
                    <select 
                      name="budget"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="">Sélectionnez une fourchette</option>
                      <option value="< 500k">Moins de 500 000 MAD</option>
                      <option value="500k-1M">500 000 - 1 000 000 MAD</option>
                      <option value="1M-5M">1 000 000 - 5 000 000 MAD</option>
                      <option value="5M-10M">5 000 000 - 10 000 000 MAD</option>
                      <option value="> 10M">Plus de 10 000 000 MAD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description du projet *
                    </label>
                    <Textarea 
                      name="message" 
                      required
                      placeholder="Décrivez votre projet en détail : localisation, superficie, contraintes particulières, délais souhaités..."
                      className="h-32"
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={submitting} 
                    size="lg"
                    className="w-full py-4 text-lg"
                  >
                    {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    {!submitting && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              </div>

              {/* Why choose us */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Pourquoi nous choisir ?</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ClockIcon className="w-6 h-6 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Réactivité garantie</h4>
                        <p className="text-gray-600 dark:text-gray-400">Réponse sous 24h et devis personnalisé sous 48h.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BuildingOfficeIcon className="w-6 h-6 text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Expertise reconnue</h4>
                        <p className="text-gray-600 dark:text-gray-400">Plus de 15 ans d&apos;expérience dans le BTP au Maroc.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-6 h-6 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Couverture nationale</h4>
                        <p className="text-gray-600 dark:text-gray-400">Intervention dans tout le Maroc avec nos équipes locales.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-blue to-brand-orange p-8 rounded-2xl text-white">
                  <h4 className="text-xl font-bold mb-4">Besoin d&apos;une intervention urgente ?</h4>
                  <p className="mb-6">
                    Notre équipe d&apos;urgence est disponible 24h/24 pour les interventions critiques.
                  </p>
                  <Button variant="outline" className="border-white text-white hover:bg-white dark:bg-gray-800 hover:text-brand-blue">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    Appeler maintenant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices section */}
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
    </div>
  )
}
