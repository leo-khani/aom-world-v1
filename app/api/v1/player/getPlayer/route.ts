import { NextRequest, NextResponse } from 'next/server';
import {  getPlayerObject } from './service';

/**
 * Handles the POST request to create a palette.
 * @param req The incoming request.
 * @returns A JSON response with the saved palette data.
 */
export async function POST(req: NextRequest) {
  try {
    const { playerId, matchType } = await req.json();

    if (!playerId) {
      return NextResponse.json({ error: 'Missing playerId' }, { status: 400 });
    }

    if (!matchType) {
      return NextResponse.json({ error: 'Missing matchType' }, { status: 400 });
    }

    if (matchType !== 1 && matchType !== 2) {
        return NextResponse.json({ error: 'Invalid matchType' }, { status: 400 });
    }

    if (!Number.isInteger(playerId)) {
      return NextResponse.json({ error: 'Invalid playerId' }, { status: 400 });
    }

    const response = await getPlayerObject(playerId, matchType);
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
