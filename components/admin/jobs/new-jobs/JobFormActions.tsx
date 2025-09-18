import Link from 'next/link'
import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface JobFormActionsProps {
  cancelLink: string
  cancelLabel?: string
  submitLabel?: string
  submitIcon?: React.ReactNode
  isSubmitting?: boolean
  onCancel?: () => void
}

export function JobFormActions({ 
  cancelLink,
  cancelLabel = "Annuler",
  submitLabel = "Créer l'offre",
  submitIcon = <BriefcaseIcon className="w-4 h-4" />,
  isSubmitting = false,
  onCancel
}: JobFormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 pt-6">
      <CancelButton 
        cancelLink={cancelLink}
        cancelLabel={cancelLabel}
        onCancel={onCancel}
      />
      <SubmitButton 
        submitLabel={submitLabel}
        submitIcon={submitIcon}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

function CancelButton({ 
  cancelLink, 
  cancelLabel, 
  onCancel 
}: { 
  readonly cancelLink: string
  readonly cancelLabel: string
  readonly onCancel?: () => void
}) {
  const handleClick = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <Link href={cancelLink} onClick={handleClick}>
      <Button variant="outline">
        {cancelLabel}
      </Button>
    </Link>
  )
}

function SubmitButton({ 
  submitLabel, 
  submitIcon, 
  isSubmitting 
}: { 
  readonly submitLabel: string
  readonly submitIcon: React.ReactNode
  readonly isSubmitting: boolean
}) {
  return (
    <Button 
      type="submit" 
      className="flex items-center space-x-2"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Création...</span>
        </>
      ) : (
        <>
          {submitIcon}
          <span>{submitLabel}</span>
        </>
      )}
    </Button>
  )
}