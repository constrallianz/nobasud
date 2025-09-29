import { NextRequest, NextResponse } from 'next/server'
import { createContactMessage } from '@/lib/actions/contacts'

// Security constants
const MAX_FIELD_LENGTH = {
  name: 100,
  email: 255,
  message: 5000,
  phone: 20,
  company: 100
}

const MIN_FIELD_LENGTH = {
  name: 2,
  message: 10
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Remove < and > characters
    .trim()
}

function validateContactData(body: any) {
  const errors: string[] = []

  // Check required fields
  if (!body.name || typeof body.name !== 'string') {
    errors.push('Le nom est requis')
  } else if (body.name.trim().length < MIN_FIELD_LENGTH.name) {
    errors.push(`Le nom doit contenir au moins ${MIN_FIELD_LENGTH.name} caractères`)
  } else if (body.name.trim().length > MAX_FIELD_LENGTH.name) {
    errors.push(`Le nom ne peut pas dépasser ${MAX_FIELD_LENGTH.name} caractères`)
  }

  if (!body.email || typeof body.email !== 'string') {
    errors.push('L\'email est requis')
  } else if (body.email.length > MAX_FIELD_LENGTH.email) {
    errors.push(`L'email ne peut pas dépasser ${MAX_FIELD_LENGTH.email} caractères`)
  } else {
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(body.email)) {
      errors.push('Format d\'email invalide')
    }
  }

  if (!body.message || typeof body.message !== 'string') {
    errors.push('Le message est requis')
  } else if (body.message.trim().length < MIN_FIELD_LENGTH.message) {
    errors.push(`Le message doit contenir au moins ${MIN_FIELD_LENGTH.message} caractères`)
  } else if (body.message.trim().length > MAX_FIELD_LENGTH.message) {
    errors.push(`Le message ne peut pas dépasser ${MAX_FIELD_LENGTH.message} caractères`)
  }

  // Validate optional fields if provided
  if (body.phone && (typeof body.phone !== 'string' || body.phone.length > MAX_FIELD_LENGTH.phone)) {
    errors.push(`Le téléphone ne peut pas dépasser ${MAX_FIELD_LENGTH.phone} caractères`)
  }

  if (body.company && (typeof body.company !== 'string' || body.company.length > MAX_FIELD_LENGTH.company)) {
    errors.push(`Le nom de l'entreprise ne peut pas dépasser ${MAX_FIELD_LENGTH.company} caractères`)
  }

  return errors
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json()

    // Validate input data
    const validationErrors = validateContactData(body)
    if (validationErrors.length > 0) {
      return NextResponse.json({
        error: 'Validation failed',
        message: validationErrors.join(', '),
        details: validationErrors
      }, { status: 400 })
    }

    // Prepare and sanitize data for database
    const contactData = {
      name: sanitizeInput(body.name.toString()),
      email: sanitizeInput(body.email.toString()).toLowerCase(),
      message: sanitizeInput(body.message.toString()),
      // Optional fields
      ...(body.phone && { phone: sanitizeInput(body.phone.toString()) }),
      ...(body.company && { company: sanitizeInput(body.company.toString()) })
    }

    // Save to database
    const contact = await createContactMessage(contactData)

    return NextResponse.json({
      success: true,
      id: contact.id,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
    }, { status: 201 })

  } catch (error) {
    console.error('Contact API error:', error)
    
    return NextResponse.json({
      error: 'Server error',
      message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
    }, { status: 500 })
  }
}
