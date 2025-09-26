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
      <div className="bg-muted rounded-xl p-8">
        <h3 className="text-xl font-bold text-foreground mb-4">Localisation</h3>
        <div className="bg-background rounded-lg p-6 text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            Carte Google Maps à intégrer
            <br />
            {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
          </p>
        </div>
      </div>
    </div>
  );
}
