import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params; // YOU MUST AWAIT THIS
  const decodedName = decodeURIComponent(name);
  const filePath = path.join(process.cwd(), 'content', decodedName);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    // This tells the browser it's an image, not a text file
    return new NextResponse(fileBuffer, {
      headers: { 'Content-Type': 'image/png' }, 
    });
  }
  return new NextResponse('Image not found', { status: 404 });
}