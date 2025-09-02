import { NextResponse } from 'next/server';
import { dbPromise } from '@/lib/db';

export async function GET() {
  try {
    const db = await dbPromise;
    const rooms = await db.all('SELECT * FROM rooms');
    const vehicles = await db.all('SELECT * FROM vehicles');
    return NextResponse.json({ rooms, vehicles });
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(
      JSON.stringify({ message: 'Failed to fetch resources', error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
