import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { protectRoute, AuthenticatedRequest } from '@/lib/auth-middleware'

// Get all applications for admin
async function getApplicationsHandler(request: AuthenticatedRequest) {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

// Update application status
async function patchApplicationHandler(req: AuthenticatedRequest) {
  try {
    const { id, status } = await req.json()
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['nouveau', 'vu', 'en_cours', 'retenu', 'refuse']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status }
    })
    
    return NextResponse.json(application)
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

// Delete application
async function deleteApplicationHandler(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    await prisma.application.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    )
  }
}

export const GET = protectRoute(getApplicationsHandler)
export const PATCH = protectRoute(patchApplicationHandler)
export const DELETE = protectRoute(deleteApplicationHandler)