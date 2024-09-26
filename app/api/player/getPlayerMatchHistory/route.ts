import { NextRequest, NextResponse } from 'next/server';
import { getPlayerMatchHistory } from './service';

interface RateLimitInfo {
  count: number;
  lastRequest: number;
}

const rateLimit = new Map<string, RateLimitInfo>();

/**
 * Handles rate limiting for incoming requests.
 * @param ip The IP address of the incoming request.
 * @returns Whether the request is within the rate limit.
 */

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

/**
 * Handles the POST request to create a palette.
 * @param req The incoming request.
 * @returns A JSON response with the saved palette data.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip;
  if (ip && !handleRateLimiting(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    const { profileId } = await req.json();

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    } 

    const response = await getPlayerMatchHistory(profileId);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
        { error: 'Error fetching data', details: (error as Error).message },
        { status: 500 }
    );
}
}

/**
 * Handles the GET request to the API.
 * @returns A JSON response indicating the method is not allowed.
 */
export function GET() {
  return NextResponse.json(
    { error: 'GET method not allowed' },
    { status: 405 }
  );
}
