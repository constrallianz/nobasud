'use client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { useApplicationSubmit } from '@/hooks/useApplicationSubmit'

export default function ApplicationForm({ jobId }: { jobId?: string }) {
  const { submitting, submitApplication } = useApplicationSubmit()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const cvFile = (e.currentTarget.cv as HTMLInputElement)?.files?.[0];
    const coverLetterFile = (e.currentTarget.coverLetter as HTMLInputElement)?.files?.[0];
    const maxSize = 3 * 1024 * 1024; 
    
    if (cvFile && cvFile.size > maxSize) {
      alert('Le fichier CV dépasse la taille maximale de 3MB.');
      return;
    }
    if (coverLetterFile && coverLetterFile.size > maxSize) {
      alert('La lettre de motivation dépasse la taille maximale de 3MB.');
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const result = await submitApplication(formData);
    
    if (result.success) {
      alert('Candidature envoyée avec succès ! Nous vous recontacterons rapidement.');
    } else {
      alert(result.error || 'Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  }

  return (
      <section className="py-20 bg-background" id="candidature-spontanee">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
           <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6">
                Aucune offre ne correspond à votre profil ?
              </h2>
              <p className="text-xl text-muted-foreground">
                Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de nouveaux talents.
              </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              {jobId && (
                <input type="hidden" name="jobId" value={jobId} />
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <Input name="name" required placeholder="Votre nom et prénom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input name="email" type="email" required placeholder="votre@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CV (PDF) *
                  </label>
                  <Input name="cv" type="file" accept="application/pdf" required />
                    <p className="text-xs text-gray-500 mt-1">Format PDF uniquement, max 3MB</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lettre de motivation (PDF)
                  </label>
                  <Input name="coverLetter" type="file" accept="application/pdf" />
                    <p className="text-xs text-gray-500 mt-1">Optionnel, format PDF, max 3MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message personnel
                </label>
                <Textarea 
                  name="message" 
                  placeholder="Parlez-nous de votre motivation, vos compétences et ce que vous pouvez apporter à NOBASUD..."
                  className="h-32"
                />
              </div>

              <div className="text-center">
                <Button 
                  type="submit"
                  disabled={submitting} 
                  size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  {submitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                  {!submitting && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
