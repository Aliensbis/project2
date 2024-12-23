import { IpcMain } from 'electron';
import { getPrismaClient } from '../../database';
import { hash } from 'bcryptjs';

export function setupAgentHandlers(ipcMain: IpcMain) {
  const prisma = getPrismaClient();

  ipcMain.handle('agents:getAll', async () => {
    try {
      return await prisma.agent.findMany({
        include: {
          customers: true
        }
      });
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  });

  ipcMain.handle('agents:create', async (_, data) => {
    try {
      const hashedPassword = await hash(data.password, 10);
      return await prisma.agent.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: hashedPassword,
          active: true
        }
      });
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }
  });

  ipcMain.handle('agents:update', async (_, id, data) => {
    try {
      const updateData: any = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        active: data.active
      };

      if (data.password) {
        updateData.password = await hash(data.password, 10);
      }

      return await prisma.agent.update({
        where: { id },
        data: updateData
      });
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  });

  ipcMain.handle('agents:delete', async (_, id) => {
    try {
      // First update all customers to remove agent reference
      await prisma.customer.updateMany({
        where: { agentId: id },
        data: { agentId: null }
      });

      return await prisma.agent.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  });
}