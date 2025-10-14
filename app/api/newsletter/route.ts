import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json(
          { error: 'Cet email est déjà inscrit à notre newsletter' },
          { status: 409 }
        )
      } else {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email: email.toLowerCase().trim() },
          data: { active: true }
        })
        return NextResponse.json(
          { message: 'Votre abonnement a été réactivé avec succès!' },
          { status: 200 }
        )
      }
    }

    // Create new newsletter subscription
    await prisma.newsletter.create({
      data: {
        email: email.toLowerCase().trim()
      }
    })

    return NextResponse.json(
      { message: 'Merci pour votre abonnement!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve all newsletter subscriptions (for admin)
export async function GET(request: NextRequest) {
  try {
    const newsletters = await prisma.newsletter.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(newsletters, { status: 200 })
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des abonnements' },
      { status: 500 }
    )
  }
}

// DELETE endpoint to unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    await prisma.newsletter.update({
      where: { email: email.toLowerCase().trim() },
      data: { active: false }
    })

    return NextResponse.json(
      { message: 'Vous avez été désabonné avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la désinscription' },
      { status: 500 }
    )
  }
}
