"use client";
import { useState } from "react";

import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        e.currentTarget.reset();
        alert(
          "Message envoyé avec succès ! Nous vous recontacterons rapidement."
        );
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }

    setSubmitting(false);
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

            <div>
              <Label htmlFor="subject">Sujet *</Label>

              <Input name="subject" required placeholder="Sujet" />
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
