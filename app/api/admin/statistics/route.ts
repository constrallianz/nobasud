import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { protectRoute } from '@/lib/auth-middleware'

// GET all statistics
async function getStatisticsHandler() {
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

// PUT update a statistic
async function updateStatisticHandler(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, value, label } = body

    if (!id || !value || !label) {
      return NextResponse.json(
        { error: 'ID, valeur et label sont requis' },
        { status: 400 }
      )
    }

    const statistic = await prisma.statistic.update({
      where: { id },
      data: {
        value,
        label,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(statistic, { status: 200 })
  } catch (error) {
    console.error('Error updating statistic:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la statistique' },
      { status: 500 }
    )
  }
}

export const GET = protectRoute(getStatisticsHandler)
export const PUT = protectRoute(updateStatisticHandler)
