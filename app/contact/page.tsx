import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import ContactForm from "@/components/contact/ContactForm";
import { COMPANY_INFO } from "@/data/footer";

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
            <div className="bg-muted rounded-xl p-4 mt-4">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Localisation
              </h3>
              <div className="rounded-lg text-center">
                <div className="w-full h-[400px] rounded overflow-hidden border">
                  <iframe
                    className="w-full h-[400px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.country}`
                    )}&zoom=15`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
