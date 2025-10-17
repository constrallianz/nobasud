import { COMPANY_INFO } from "@/data/footer";
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

    
    </div>
  );
}
