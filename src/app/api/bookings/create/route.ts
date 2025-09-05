import { NextResponse } from 'next/server';
import { dbPromise } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const db = await dbPromise;
    const { resourceType, resourceId, startTime, endTime, userId } = await request.json();

    // Basic validation
    if (!resourceType || !resourceId || !startTime || !endTime || !userId) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Convert to ISO strings for consistent DB format
    const startISO = new Date(startTime).toISOString();
    const endISO = new Date(endTime).toISOString();

    if (startISO >= endISO) {
        return new NextResponse(
        JSON.stringify({ message: 'End time must be after start time' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for overlapping bookings
    const overlappingBooking = await db.get(
      `SELECT * FROM bookings
       WHERE resource_type = ? AND resource_id = ? AND (
         (start_time < ? AND end_time > ?)
       )`,
      [resourceType, resourceId, endISO, startISO]
    );

    if (overlappingBooking) {
      return new NextResponse(
        JSON.stringify({ message: '해당 시간에는 이미 예약이 있습니다.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } } // 409 Conflict
      );
    }

    // Insert the new booking
    const result = await db.run(
      'INSERT INTO bookings (resource_type, resource_id, start_time, end_time, user_id) VALUES (?, ?, ?, ?, ?)',
      [resourceType, resourceId, startISO, endISO, userId]
    );

    return NextResponse.json({ message: '예약이 성공적으로 완료되었습니다.', bookingId: result.lastID });

  } catch (error) {
    console.error('Failed to create booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(
      JSON.stringify({ message: 'Failed to create booking', error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
