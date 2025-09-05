
import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const db = await openDb();

  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', email);

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Don't send the password hash to the client
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });

  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}
