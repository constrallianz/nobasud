import { NextResponse } from 'next/server'
import { createApplication } from '@/lib/actions/applications'
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs'


export type AllowedKind = 'cv' | 'letter';

const ALLOWED_MIME: Record<AllowedKind, Set<string>> = {
  cv: new Set([
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  ]),
  letter: new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]),
};

const MAX_SIZE_MB = 3; 
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

 function assertAllowed(file: File, kind: AllowedKind) {
  if (!file || file.size === 0) {
    throw new Error('Empty file.');
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(`File too large. Max ${MAX_SIZE_MB} MB.`);
  }
  const type = file.type || '';
  if (!ALLOWED_MIME[kind].has(type)) {
    throw new Error('Unsupported file type.');
  }
}

 async function fileToBuffer(file: File): Promise<Buffer> {
  const ab = await file.arrayBuffer();
  return Buffer.from(ab);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const cv = formData.get('cv') as File | null;
    const coverLetter = formData.get('coverLetter') as File | null;

    if (!name || !email || !cv) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate & upload CV
    assertAllowed(cv, 'cv');
    const cvBuf = await fileToBuffer(cv);
    const cvUpload:any = await uploadBufferToCloudinary(
      cvBuf,
      'applications/cv'
    );
    const cvUrl = cvUpload.secure_url;

    // Validate & upload Cover Letter (optional)
    let coverLetterUrl: string | undefined = undefined;
    if (coverLetter && coverLetter.size > 0) {
      assertAllowed(coverLetter, 'letter');
      const letterBuf = await fileToBuffer(coverLetter);
      const letterUpload:any = await uploadBufferToCloudinary(
        letterBuf,
        'applications/letters'
      );
      coverLetterUrl = letterUpload.secure_url;
    }

    // Persist application record
    const application = await createApplication({
      name,
      email,
      message,
      cvUrl,
      coverLetterUrl,
    });

    return NextResponse.json({ id: application.id, cvUrl, coverLetterUrl }, { status: 201 });
  } catch (e: any) {
    console.error(e);
    const msg =
      typeof e?.message === 'string' && /Unsupported file type|File too large|Empty file/.test(e.message)
        ? e.message
        : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

