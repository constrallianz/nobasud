import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { protectRoute } from '@/lib/auth-middleware'

// GET all locations
async function getLocationsHandler() {
  try {
    const locations = await prisma.location.findMany({
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

// POST create a new location
async function createLocationHandler(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, address, city, lat, lng, order = 0 } = body

    if (!name || !address || !city || lat === undefined || lng === undefined) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    const location = await prisma.location.create({
      data: {
        name,
        address,
        city,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        order: parseInt(order)
      }
    })

    return NextResponse.json(location, { status: 201 })
  } catch (error) {
    console.error('Error creating location:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'emplacement' },
      { status: 500 }
    )
  }
}

// PUT update a location
async function updateLocationHandler(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, address, city, lat, lng, order, active } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (address !== undefined) updateData.address = address
    if (city !== undefined) updateData.city = city
    if (lat !== undefined) updateData.lat = parseFloat(lat)
    if (lng !== undefined) updateData.lng = parseFloat(lng)
    if (order !== undefined) updateData.order = parseInt(order)
    if (active !== undefined) updateData.active = active
    updateData.updatedAt = new Date()

    const location = await prisma.location.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(location, { status: 200 })
  } catch (error) {
    console.error('Error updating location:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'emplacement' },
      { status: 500 }
    )
  }
}

// DELETE a location
async function deleteLocationHandler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      )
    }

    await prisma.location.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Emplacement supprimé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting location:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'emplacement' },
      { status: 500 }
    )
  }
}

export const GET = protectRoute(getLocationsHandler)
export const POST = protectRoute(createLocationHandler)
export const PUT = protectRoute(updateLocationHandler)
export const DELETE = protectRoute(deleteLocationHandler)
