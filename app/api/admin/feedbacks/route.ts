import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { feedbackSchema } from '@/lib/validations';
import { protectRoute, AuthenticatedRequest } from '@/lib/auth-middleware'

const prisma = new PrismaClient();

// GET /api/admin/feedbacks - Get all feedbacks
async function getFeedbacksHandler(request: AuthenticatedRequest) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/feedbacks - Create a new feedback
async function createFeedbackHandler(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = feedbackSchema.parse(body);
    
    // Remove system fields from the data before creation
    const { id, createdAt, updatedAt, ...feedbackData } = validatedData;

    const feedback = await prisma.feedback.create({
      data: {
        ...feedbackData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = protectRoute(getFeedbacksHandler)
export const POST = protectRoute(createFeedbackHandler)