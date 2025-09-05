
import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
  }

  const db = await openDb();

  try {
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', name, email, hashedPassword);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration failed:', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}
