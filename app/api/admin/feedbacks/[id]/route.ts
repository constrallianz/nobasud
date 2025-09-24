import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { feedbackSchema } from '@/lib/validations';

const prisma = new PrismaClient();

// GET /api/admin/feedbacks/[id] - Get a single feedback
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/feedbacks/[id] - Update a feedback
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Check if feedback exists
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id: params.id },
    });

    if (!existingFeedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    // Merge with existing data and validate
    const mergedData = {
      ...existingFeedback,
      ...body,
      updatedAt: new Date()
    };

    const validatedData = feedbackSchema.parse(mergedData);
    
    // Remove system fields from update data
    const { id, createdAt, updatedAt, ...updateData } = validatedData;

    // Update the feedback
    const updatedFeedback = await prisma.feedback.update({
      where: {
        id: params.id,
      },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    
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

// DELETE /api/admin/feedbacks/[id] - Delete a feedback
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if feedback exists
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id: params.id },
    });

    if (!existingFeedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    // Delete the feedback
    await prisma.feedback.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: 'Feedback deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}