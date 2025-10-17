import { COMPANY_INFO } from "@/data/footer";
import { ContactInfo } from "@/types/contact";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-primary mb-8">
          Informations de contact
        </h2>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Adresse</h3>
              <p className="text-muted-foreground" data-testid="address-info">
                {COMPANY_INFO.address.street}
                <br />
                {COMPANY_INFO.address.details}
                <br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="text-accent h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
              <p className="text-muted-foreground" data-testid="phone-info">
                {COMPANY_INFO.contact.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground" data-testid="email-info">
                {COMPANY_INFO.contact.email}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="text-accent h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Horaires</h3>
              <p className="text-muted-foreground" data-testid="hours-info">
                {COMPANY_INFO.contact.hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative bg-muted rounded-2xl p-8 border border-border overflow-hidden">
        <h3 className="text-xl font-bold text-foreground mb-6">Localisation</h3>
        
        <div className="relative bg-card rounded-xl overflow-hidden border border-border shadow-lg">
          {/* Google Maps iframe */}
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
          
          {/* Location Info Overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-3 border border-border">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1 text-sm">NOBASUD</h4>
                <p className="text-xs text-foreground font-medium">{COMPANY_INFO.address.street}</p>
                <p className="text-xs text-foreground font-medium">{COMPANY_INFO.address.details}</p>
                <p className="text-xs font-bold text-primary mt-1">
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
