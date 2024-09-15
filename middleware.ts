// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.API_SECRET_KEY;

  if (authHeader !== `Bearer ${apiKey}`) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/auth/:path*',
};