import { PrismaClient } from '@prisma/client';
import { setupMigrations } from './migrations';
import { initializeData } from './seed';

let prisma: PrismaClient;

export async function setupDatabase() {
  prisma = new PrismaClient();
  await setupMigrations();
  await initializeData();
  return prisma;
}

export function getPrismaClient() {
  if (!prisma) {
    throw new Error('Database not initialized');
  }
  return prisma;
}