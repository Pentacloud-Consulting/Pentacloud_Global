import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile, stat } from 'fs/promises';

export const dynamic = 'force-dynamic';

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const rawFileName = resolvedParams.filename ? resolvedParams.filename.join('/') : '';
    
    if (!rawFileName) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const fileName = path.basename(rawFileName);

    // Search paths on VPS disk
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'uploads', 'resumes', fileName),
      path.join(process.cwd(), 'public', 'uploads', fileName),
      path.join(process.cwd(), 'uploads', 'resumes', fileName),
      path.join('/var/www/pentacloud-india', 'public', 'uploads', 'resumes', fileName),
    ];

    let foundPath: string | null = null;
    for (const p of possiblePaths) {
      try {
        const fileStat = await stat(p);
        if (fileStat.isFile()) {
          foundPath = p;
          break;
        }
      } catch {
        // Continue checking
      }
    }

    if (!foundPath) {
      console.warn(`⚠️ Resume file not found on disk: ${fileName}`);
      return NextResponse.json({ error: 'Resume file not found on server' }, { status: 404 });
    }

    const fileBuffer = await readFile(foundPath);
    const mimeType = getMimeType(fileName);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileBuffer.length.toString(),
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error: any) {
    console.error('Error serving resume file:', error);
    return NextResponse.json({ error: 'Internal server error reading file' }, { status: 500 });
  }
}
