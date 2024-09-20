import { NextRequest, NextResponse } from 'next/server';
import { getPlayerRanks } from './service';

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

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || '';
  
  // Check if rate limit is exceeded
  if (!handleRateLimiting(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    // Parse the JSON body from the POST request
    const body = await req.json();
    const { userName } = body;

    if (!userName) {
      return NextResponse.json(
        { error: 'userName is required' },
        { status: 400 }
      );
    }

    // Fetch player ranks using the provided username
    const response = await getPlayerRanks(userName);
    if (!response) {
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
export function GET() {
  return NextResponse.json(
    { error: 'GET method not allowed' },
    { status: 405 }
  );
}


