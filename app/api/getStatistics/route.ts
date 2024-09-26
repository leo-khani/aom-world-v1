// src/pages/api/statistics/mostPlayedCivs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getMostPlayedCivs } from './service';

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
  const ip = req.headers.get('x-forwarded-for') || req.ip || '';
  if (!handleRateLimiting(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    const mostPlayedCivs = await getMostPlayedCivs();
    return NextResponse.json(mostPlayedCivs);
  } catch (error) {
    console.error('Error fetching most played civilizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics', details: (error as Error).message },
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
