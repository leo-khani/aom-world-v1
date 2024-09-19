import { NextRequest, NextResponse } from 'next/server';
import { getPlayerElo } from './service';

interface RateLimitInfo {
  count: number;
  lastRequest: number;
}

const rateLimit = new Map<string, RateLimitInfo>();

function handleRateLimiting(ip: string): boolean {
  const now = Date.now();
  const timeWindow = 60 * 1000; 
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
  const ip = req.headers.get('x-forwarded-for') || req.ip || '';
  if (!handleRateLimiting(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    const url = new URL(req.nextUrl);
    const userId = url.searchParams.get('userId');
    const matchType = url.searchParams.get('matchType');

    if (userId === null) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    } 

    if (matchType === null) {
      return NextResponse.json(
        { error: 'matchType is required' },
        { status: 400 }
      );
    }

    const response = await getPlayerElo(parseInt(userId, 10), parseInt(matchType, 10));
    if (response === null) {
      throw new Error('Error fetching data');
    }
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
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


