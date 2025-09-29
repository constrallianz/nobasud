import { NextRequest, NextResponse } from 'next/server'
import { createContactMessage } from '@/lib/actions/contacts'
import { withValidation, commonSchemas } from '@/lib/api-validation'

export const POST = withValidation(
  commonSchemas.contact,
  async (req: NextRequest, validatedData: any) => {
    try {
      const contact = await createContactMessage(validatedData)
      
      return NextResponse.json(
        { 
          success: true,
          id: contact.id,
          message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
        }, 
        { status: 201 }
      )
    } catch (error) {
      console.error('Contact API error:', error)
      return NextResponse.json(
        { 
          error: 'Erreur serveur',
          message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
        }, 
        { status: 500 }
      )
    }
  }
)
