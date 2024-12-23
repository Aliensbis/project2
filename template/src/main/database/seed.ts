import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

export async function initializeData() {
  const prisma = new PrismaClient();

  // Check if admin exists
  const adminExists = await prisma.user.findFirst({
    where: { role: 'admin' }
  });

  if (!adminExists) {
    // Create default admin user
    await prisma.user.create({
      data: {
        role: 'admin',
        name: 'Administrator',
        password: await hash('admin2024', 10)
      }
    });

    // Create default production user
    await prisma.user.create({
      data: {
        role: 'production',
        name: 'Production',
        password: await hash('prod2024', 10)
      }
    });
  }
}