import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard } from './service';

/**
 * Handles the POST request to create a palette.
 * @param req The incoming request.
 * @returns A JSON response with the saved palette data.
 */
export async function POST(req: NextRequest) {
  try {
    const { region, matchType, consoleMatchType, searchPlayer, page, count, sortColumn, sortDirection } = await req.json();
    
    const response = await getLeaderboard(region, matchType, consoleMatchType, searchPlayer, page, count, sortColumn, sortDirection);
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
