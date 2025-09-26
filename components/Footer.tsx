import Link from 'next/link'
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img 
              src="/logo-nobasud.png" 
              alt="NOBASUD Logo" 
              className="h-12 w-auto mb-6 filter brightness-0 invert"
              data-testid="footer-logo"
            />
            <p className="text-lg mb-6 max-w-md">
              {COMPANY_INFO.slogan}. Acteur engagé du secteur BTP au Maroc, construisant des infrastructures pérennes.
            </p>
            <div className="flex space-x-4">
              <a 
                href={COMPANY_INFO.social.linkedin} 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="link-linkedin"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 00.1.4V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
              <Link 
                href="/feedback" 
                className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center hover:bg-accent/90 transition-colors"
                data-testid="link-feedback-footer"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/a-propos" className="hover:text-accent transition-colors">À propos</Link></li>
              <li><Link href="/notre-approche" className="hover:text-accent transition-colors">Notre approche</Link></li>
              <li><Link href="/realisations" className="hover:text-accent transition-colors">Nos réalisations</Link></li>
              <li><Link href="/carriere" className="hover:text-accent transition-colors">Carrières</Link></li>
              <li><Link href="/media" className="hover:text-accent transition-colors">Médias</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start">
                <MapPin className="mt-1 mr-3 text-accent h-4 w-4 flex-shrink-0" />
                <span>
                  {COMPANY_INFO.address.street}<br />
                  {COMPANY_INFO.address.details}<br />
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
                </span>
              </p>
              <p className="flex items-center">
                <Phone className="mr-3 text-accent h-4 w-4" />
                <span>{COMPANY_INFO.contact.phone}</span>
              </p>
              <p className="flex items-center">
                <Mail className="mr-3 text-accent h-4 w-4" />
                <span>{COMPANY_INFO.contact.email}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm opacity-80 mb-4 lg:mb-0">
            © 2024 NOBASUD. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/mentions-legales" className="hover:text-accent transition-colors">
              Mentions légales
            </Link>
            <Link href="/mentions-legales#rgpd" className="hover:text-accent transition-colors">
              RGPD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
