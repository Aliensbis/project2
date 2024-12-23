import { IpcMain } from 'electron';
import { getPrismaClient } from '../../database';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

export function setupAuthHandlers(ipcMain: IpcMain) {
  ipcMain.handle('auth:login', async (_, { role, password, email }) => {
    const prisma = getPrismaClient();

    try {
      if (role === 'agent' && email) {
        const agent = await prisma.agent.findUnique({
          where: { email }
        });

        if (!agent || !agent.active || !(await compare(password, agent.password))) {
          return { error: 'Invalid credentials' };
        }

        const token = sign({ id: agent.id, role: 'agent' }, JWT_SECRET);
        return { token, user: { ...agent, role: 'agent' } };
      }

      const user = await prisma.user.findFirst({
        where: { role }
      });

      if (!user || !(await compare(password, user.password))) {
        return { error: 'Invalid credentials' };
      }

      const token = sign({ id: user.id, role: user.role }, JWT_SECRET);
      return { token, user };

    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Authentication failed' };
    }
  });
}