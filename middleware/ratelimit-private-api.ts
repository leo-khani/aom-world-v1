import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map();

function handleRateLimiting(ip: string) {
  const now = Date.now();
  const timeWindow = 60 * 1000; 
  const maxRequests = 20;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, lastRequest: now });
  } else {
    const requestInfo = rateLimit.get(ip);
    if (now - requestInfo.lastRequest < timeWindow) {
      requestInfo.count++;
    } else {
      requestInfo.count = 1;
      requestInfo.lastRequest = now;
    }
    if (requestInfo.count > maxRequests) {
      return false;
    }
    rateLimit.set(ip, requestInfo);
  }
  return true;
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.ip;
    if (ip && !handleRateLimiting(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { status: 429, headers: { 'content-type': 'application/json' } }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/private/:path*',
}