// This is an ES Module, so we use import/export syntax.
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { mkdir } from 'fs/promises';

async function setup() {
  console.log('Setting up database...');
  const dbPath = path.join(process.cwd(), 'database');

  // Ensure the database directory exists
  try {
    await mkdir(dbPath, { recursive: true });
    console.log('Database directory created or already exists.');
  } catch (e) {
    console.error('Failed to create database directory:', e);
    process.exit(1);
  }

  const db = await open({
    filename: path.join(dbPath, 'booking.db'),
    driver: sqlite3.Database,
  });

  await db.exec(`
    -- Enable foreign key support
    PRAGMA foreign_keys = ON;

    -- Create rooms table
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      capacity INTEGER
    );

    -- Create vehicles table
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      plate_number TEXT UNIQUE
    );

    -- Create users table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    -- Create bookings table
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      resource_type TEXT NOT NULL CHECK(resource_type IN ('room', 'vehicle')),
      resource_id INTEGER NOT NULL,
      user_id INTEGER,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  console.log('Tables created or already exist.');

  // Seed rooms
  const roomsCount = await db.get('SELECT COUNT(*) as count FROM rooms');
  if (roomsCount.count === 0) {
    await db.run('INSERT INTO rooms (name, description, capacity) VALUES (?, ?, ?)', '1회의실', '대형 스크린 구비', 10);
    await db.run('INSERT INTO rooms (name, description, capacity) VALUES (?, ?, ?)', '2회의실', '화이트보드 구비', 6);
    await db.run('INSERT INTO rooms (name, description, capacity) VALUES (?, ?, ?)', '휴게실', '소파 및 테이블', 4);
    console.log('Seeded rooms table.');
  }

  // Seed vehicles
  const vehiclesCount = await db.get('SELECT COUNT(*) as count FROM vehicles');
  if (vehiclesCount.count === 0) {
    await db.run('INSERT INTO vehicles (name, description, plate_number) VALUES (?, ?, ?)', '업무용 1호차', '5인승 세단', '12가3456');
    await db.run('INSERT INTO vehicles (name, description, plate_number) VALUES (?, ?, ?)', '업무용 2호차', '9인승 승합차', '78나9012');
    console.log('Seeded vehicles table.');
  }

  await db.close();
  console.log('Database setup complete and connection closed.');
}

setup().catch(err => {
  console.error('Database setup failed:', err);
  process.exit(1);
});
