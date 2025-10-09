"use client";

import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactForm() {
  const { submitting, submitContact } = useContactForm();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Combine first and last name into a single name field
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const name = `${firstName} ${lastName}`.trim();

    // Prepare data for the API
    const contactData = {
      name,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      // Optional fields - only include if they have values
      ...(formData.get('phone') && { phone: formData.get('phone') as string }),
      ...(formData.get('company') && { company: formData.get('company') as string }),
    };

    const result = await submitContact(contactData);
    
    if (result.success) {
      e.currentTarget.reset();
      alert(result.message || "Message envoyé avec succès ! Nous vous recontacterons rapidement.");
    } else if (result.details) {
      // Show validation errors if available
      const errorMessages = Object.values(result.details).join('\n');
      alert(`Erreurs de validation:\n${errorMessages}`);
    } else {
      alert(result.message || result.error || "Erreur lors de l'envoi. Veuillez réessayer.");
    }
  }

  return (
    <div>
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Envoyez-nous un message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">Nom *</Label>
                <Input name="firstName" required placeholder="Votre nom" />
              </div>
              <div>
                <Label htmlFor="lastName">Prénom *</Label>
                <Input name="lastName" required placeholder="Votre prénom" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                name="email"
                type="email"
                required
                placeholder="votre@email.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  name="phone" 
                  type="tel"
                  placeholder="+212 6XX XXX XXX" 
                />
              </div>
              <div>
                <Label htmlFor="company">Entreprise</Label>
                <Input 
                  name="company" 
                  placeholder="Nom de votre entreprise" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                name="message"
                required
                placeholder="Décrivez votre projet en détail : localisation, superficie, contraintes particulières, délais souhaités..."
                className="h-32"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              disabled={submitting}
              data-testid="button-submit-contact"
            >
              {submitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer le message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
