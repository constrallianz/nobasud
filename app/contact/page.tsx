import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="relative font-montserrat">
      <ContactHero />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactInfoCards />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
