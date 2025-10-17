import { getJobById } from "@/lib/actions/jobs";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
     try {
        console.log("Fetching job with ID:", params.id);
        const job = await getJobById(params.id);
        if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        return NextResponse.json(job);
      } catch (error) {
        console.error('Error fetching job:', error);
        return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
      }
}
   