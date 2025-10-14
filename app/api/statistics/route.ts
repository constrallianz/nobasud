import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const statistics = await prisma.statistic.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(statistics, { status: 200 })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}
