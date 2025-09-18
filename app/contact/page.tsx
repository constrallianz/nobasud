import ContactHero from '@/components/contact/ContactHero'
import ContactInfoCards from '@/components/contact/ContactInfoCards'
import ContactForm from '@/components/contact/ContactForm'
import OfficeLocations from '@/components/contact/OfficeLocations'

export default function ContactPage() {
  return (
    <div className="relative">
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <OfficeLocations />
    </div>
  )
}
