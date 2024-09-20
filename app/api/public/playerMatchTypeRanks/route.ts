import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard } from './service';

const rateLimit = new Map();

/**
 * Handles rate limiting for incoming requests.
 * @param ip The IP address of the incoming request.
 * @returns Whether the request is within the rate limit.
 */
function handleRateLimiting(ip: string) {
  const now = Date.now();
  const timeWindow = 60 * 1000; // 1 minute
  const maxRequests = 500;

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
    const { username } = await req.json();

    
    const response = await getLeaderboard(username);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
