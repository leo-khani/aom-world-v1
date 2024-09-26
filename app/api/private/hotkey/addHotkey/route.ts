import { NextRequest, NextResponse } from 'next/server';
import { addHotkey } from './service';
import { AddHotkeyRequest } from './type';

export async function POST(req: NextRequest) {
  console.log('API route hit');

  try {
    const formData = await req.formData();
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const xmlFile = formData.get('xmlFile') as File;

    if (!title || !description || !xmlFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const body: AddHotkeyRequest = {
      title,
      description,
      xmlFile,
      email
    };

    const data = await addHotkey(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(
    { error: 'GET method not allowed' },
    { status: 405 }
  );
}
