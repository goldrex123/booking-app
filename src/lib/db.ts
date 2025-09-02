import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

// This function opens the database connection.
// It's designed to be called once and the promise reused.
async function openDb() {
  const dbPath = path.join(process.cwd(), 'database');
  // The setup script will create this directory.

  return open({
    filename: path.join(dbPath, 'booking.db'),
    driver: sqlite3.Database,
  });
}

// Export a promise that resolves to the database instance.
// This ensures the database is initialized only once across the app.
export const dbPromise = openDb();
