import { NextRequest, NextResponse } from 'next/server';
import { getHotkey } from './service';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const ipAddress = req.headers.get('x-forwarded-for') || req.ip;

  try {
    const data = await getHotkey(id ? parseInt(id) : undefined, ipAddress);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      if (error.message === 'Hotkey not found') {
        return NextResponse.json({ error: 'Hotkey not found' }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export function POST() {
  return NextResponse.json(
    { error: 'POST method not allowed' },
    { status: 405 }
  );
}
