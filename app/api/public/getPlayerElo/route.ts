import { NextRequest, NextResponse } from 'next/server';

interface RateLimitInfo {
  count: number;
  lastRequest: number;
}

const rateLimit = new Map<string, RateLimitInfo>();

function handleRateLimiting(ip: string): boolean {
  const now = Date.now();
  const timeWindow = 60 * 1000; // 1 minute
  const maxRequests = 500;

  const requestInfo = rateLimit.get(ip);

  if (!requestInfo) {
    rateLimit.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  if (now - requestInfo.lastRequest < timeWindow) {
    requestInfo.count++;
  } else {
    requestInfo.count = 1;
    requestInfo.lastRequest = now;
  }

  rateLimit.set(ip, requestInfo);

  return requestInfo.count <= maxRequests;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip;
  if (ip && !handleRateLimiting(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const matchType = url.searchParams.get('matchType');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    } 

    if (!matchType) {
      return NextResponse.json(
        { error: 'matchType is required' },
        { status: 400 }
      );
    }

    const response = await getPlayerMatchHistory(userId, parseInt(matchType));
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching data', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export function POST() {
  return NextResponse.json(
    { error: 'POST method not allowed' },
    { status: 405 }
  );
}

function getPlayerMatchHistory(userId: string, arg1: number) {
  throw new Error('Function not implemented.');
}
