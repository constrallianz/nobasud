import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch all contact messages from database
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc' // Most recent first
      }
    })

    // Transform the data to match the frontend interface
    const transformedMessages = messages.map(message => ({
      id: message.id,
      name: message.name,
      email: message.email,
      phone: null, // ContactMessage model doesn't have phone field
      subject: 'Message de contact', // Default subject since not in DB
      message: message.message,
      submittedAt: message.createdAt.toISOString(),
      status: 'nouveau', // Default status - you could add this field to DB later
      priority: 'normale', // Default priority - you could add this field to DB later
      source: 'contact'
    }))

    return NextResponse.json({
      success: true,
      messages: transformedMessages
    })

  } catch (error) {
    console.error('Messages API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch messages',
      messages: []
    }, { status: 500 })
  }
}