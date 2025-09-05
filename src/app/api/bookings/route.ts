import { NextResponse } from 'next/server';
import { dbPromise } from '@/lib/db';

export async function GET() {
  try {
    const db = await dbPromise;
    const bookings = await db.all(`
      SELECT
        b.id,
        b.start_time,
        b.end_time,
        b.resource_type,
        r.name AS resource_name,
        u.name AS user_name
      FROM
        bookings b
      JOIN
        rooms r ON b.resource_id = r.id AND b.resource_type = 'room'
      LEFT JOIN
        users u ON b.user_id = u.id
      UNION ALL
      SELECT
        b.id,
        b.start_time,
        b.end_time,
        b.resource_type,
        v.name AS resource_name,
        u.name AS user_name
      FROM
        bookings b
      JOIN
        vehicles v ON b.resource_id = v.id AND b.resource_type = 'vehicle'
      LEFT JOIN
        users u ON b.user_id = u.id
      ORDER BY
        b.start_time DESC;
    `);

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(
      JSON.stringify({ message: 'Failed to fetch bookings', error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
