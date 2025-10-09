import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { protectRoute, AuthenticatedRequest } from '@/lib/auth-middleware'

async function dashboardHandler(request: AuthenticatedRequest) {
  try {
    // Fetch all counts in parallel for better performance
    const [
      projectsCount,
      articlesCount,
      jobsCount,
      applicationsCount,
      feedbacksCount,
      messagesCount
    ] = await Promise.all([
      prisma.project.count(),
      prisma.article.count(),
      prisma.job.count(),
      prisma.application.count(),
      prisma.feedback.count(),
      prisma.contactMessage.count(),
    ])

    const stats = {
      projects: projectsCount,
      articles: articlesCount,
      jobs: jobsCount,
      applications: applicationsCount,
      feedbacks: feedbacksCount,
      messages: messagesCount
    }

    return NextResponse.json({
      success: true,
      stats,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    
    // Return fallback data in case of database connection issues
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch dashboard statistics',
      stats: {
        projects: 0,
        articles: 0,
        jobs: 0,
        applications: 0,
        feedbacks: 0,
        messages: 0
      }
    }, { status: 500 })
  }
}

export const GET = protectRoute(dashboardHandler)