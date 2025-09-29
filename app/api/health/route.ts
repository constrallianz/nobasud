import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'NOBASUD API is running',
  });
}

export async function POST() {
  return NextResponse.json({
    message: 'Health check POST endpoint',
    timestamp: new Date().toISOString(),
  });
}