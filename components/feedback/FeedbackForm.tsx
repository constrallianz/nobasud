"use client";
import React, { useState, useRef } from "react";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../ui/select";
import { useFeedbackSubmit } from "@/hooks/useFeedbackSubmit";

export default function FeedbackForm() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const prevNameRef = useRef("");
  const prevEmailRef = useRef("");
  
  const { submitting, submitFeedback } = useFeedbackSubmit();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      alert("Veuillez donner une note avant d'envoyer votre avis.");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", isAnonymous ? "anonyme" : name);
    formData.append("email", isAnonymous ? "anonyme" : email);
    formData.append("company", company);
    formData.append("project", project);
    formData.append("comment", comment);
    formData.append("rating", rating.toString());
    formData.append("consent", consent ? "true" : "false");
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    const result = await submitFeedback(formData);
    
    if (result.success) {
      setName("");
      setEmail("");
      setCompany("");
      setProject("");
      setComment("");
      setRating(0);
      setPhotoFile(null);
      setConsent(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Merci pour votre avis !");
      setIsAnonymous(false);
    } else {
      alert(result.error || "Erreur lors de l'envoi. Veuillez réessayer.");
    }
  }

  return (
    <section id="donner-avis" className="py-24 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-primary mb-8 text-center">
              Formulaire de feedback
            </h2>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
              >
                {/* Anonymous Option */}
                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Checkbox
                    id="isAnonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => {
                      setIsAnonymous(checked as boolean);
                      if (checked) {
                        prevNameRef.current = name;
                        prevEmailRef.current = email;
                        setName("");
                        setEmail("");
                      } else {
                        setName(prevNameRef.current);
                        setEmail(prevEmailRef.current);
                      }
                    }}
                    data-testid="checkbox-anonymous"
                  />
                  <Label htmlFor="isAnonymous" className="text-sm font-medium cursor-pointer">
                    Je souhaite rester anonyme
                  </Label>
                </div>

                {/* Contact Info (if not anonymous) */}
                {!isAnonymous && (
                  <div className="grid md:grid-cols-2 gap-6">
                      <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Votre nom et prénom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                        data-testid="input-name"
                      />
                    </div>
                     <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Entreprise/Organisation
                  </label>
                  <Input
                    name="company"
                    placeholder="Nom de votre entreprise"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="project"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Projet réalisé *
                  </label>
                  <Input
                    name="project"
                    required
                    placeholder="Décrivez brièvement le projet"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  />
                </div>
              </div>

                  {/* Zone */}
                  <div>
                    <Label htmlFor="zone">Zone géographique (facultatif)</Label>
                    <Input
                      id="zone"
                      name="zone"
                      placeholder="Ex: Agadir, Taroudant, Ouarzazate..."
                      className="mt-1"
                      data-testid="input-zone"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Décrivez votre feedback en détail..."
                      className="mt-1"
                      data-testid="textarea-message"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  {/* File Attachment */}
                  <div>
                    <Label htmlFor="attachment">Pièce jointe (photo)</Label>
                    <Input
                      id="attachment"
                      name="attachment"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="mt-1"
                      data-testid="input-attachment"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setPhotoFile(file);
                      }}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Formats acceptés : JPG, PNG, GIF (max 10MB)
                    </p>
                  </div>

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                      disabled={submitting}
                      data-testid="button-submit-feedback"
                    >
                      {submitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <ArrowRightIcon className="mr-2 h-5 w-5" />
                          Envoyer le feedback
                        </>
                      )}
                    </Button>
                  </div>

 

            </form>
            </CardContent>
            </Card>
          </div>
        </div>
    </section>
  );
}
