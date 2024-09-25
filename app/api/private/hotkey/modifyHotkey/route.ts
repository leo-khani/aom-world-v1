import { NextRequest, NextResponse } from 'next/server';
import { modifyHotkey } from './service';
import { ModifyHotkeyRequest } from './type';

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: ModifyHotkeyRequest = await req.json();
    const data = await modifyHotkey(userId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}