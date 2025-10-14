import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(locations, { status: 200 })
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des emplacements' },
      { status: 500 }
    )
  }
}
