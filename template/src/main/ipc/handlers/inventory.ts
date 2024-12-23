import { IpcMain } from 'electron';
import { getPrismaClient } from '../../database';

export function setupInventoryHandlers(ipcMain: IpcMain) {
  const prisma = getPrismaClient();

  ipcMain.handle('inventory:getAll', async () => {
    try {
      return await prisma.inventory.findMany({
        orderBy: { updatedAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  });

  ipcMain.handle('inventory:update', async (_, data) => {
    try {
      return await prisma.inventory.upsert({
        where: { productId: data.productId },
        update: {
          quantity: data.quantity,
          updatedAt: new Date()
        },
        create: {
          productId: data.productId,
          quantity: data.quantity
        }
      });
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  });
}