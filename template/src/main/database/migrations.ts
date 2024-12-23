import { PrismaClient } from '@prisma/client';
import { app } from 'electron';
import path from 'path';
import fs from 'fs-extra';

export async function setupMigrations() {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'database.sqlite');
  
  // Ensure database directory exists
  await fs.ensureDir(path.dirname(dbPath));
  
  // Copy initial database if it doesn't exist
  if (!await fs.pathExists(dbPath)) {
    const initialDbPath = path.join(__dirname, '../../../prisma/dev.db');
    if (await fs.pathExists(initialDbPath)) {
      await fs.copy(initialDbPath, dbPath);
    }
  }
}