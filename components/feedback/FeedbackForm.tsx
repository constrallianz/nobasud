"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function FeedbackForm() {
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      alert("Veuillez donner une note avant d'envoyer votre avis.");
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("company", company);
    formData.append("project", project);
    formData.append("comment", comment);
    formData.append("rating", rating.toString());
    formData.append("consent", consent ? "true" : "false");
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
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
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }
    setSubmitting(false);
  }

  return (
    <section id="donner-avis" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Partagez votre{" "}
              <span className="text-brand-orange">expérience</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Votre avis nous aide à améliorer nos services et guide les futurs
              clients dans leur choix. Merci de prendre quelques minutes pour le
              partager.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="Votre nom et prénom"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Projet réalisé *
                  </label>
                  <Input
                    name="project"
                    required
                    placeholder="Décrivez brièvement le projet"
                    value={project}
                    onChange={e => setProject(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Votre note globale *
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <StarIconSolid
                        className={`w-10 h-10 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Votre témoignage *
                </label>
                <Textarea
                  name="comment"
                  required
                  placeholder="Partagez votre expérience avec NOBASUD : qualité du travail, respect des délais, relation client, satisfaction générale..."
                  className="h-32"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photos du projet (optionnel)
                </label>
                <Input
                  name="photo"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={e => {
                    const file = e.target.files?.[0] || null;
                    setPhotoFile(file);
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-blue file:text-white hover:file:bg-brand-blue/90"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formats acceptés: JPG, PNG. Max 5 photos de 2MB chacune.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="w-4 h-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  J&apos;autorise NOBASUD à publier mon témoignage sur son site
                  web et ses supports de communication *
                </label>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={submitting || rating === 0}
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  {submitting ? "Envoi en cours..." : "Publier mon avis"}
                  {!submitting && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
