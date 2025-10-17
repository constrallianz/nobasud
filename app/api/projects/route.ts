export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse, NextRequest } from 'next/server';
import { getProjects } from '@/lib/actions/projects';

export async function GET(req: NextRequest) {
  try {
        const projects = await getProjects()
        return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
