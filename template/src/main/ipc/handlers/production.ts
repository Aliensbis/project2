import { IpcMain } from 'electron';
import { getPrismaClient } from '../../database';

export function setupProductionHandlers(ipcMain: IpcMain) {
  const prisma = getPrismaClient();

  ipcMain.handle('production:getAll', async () => {
    try {
      return await prisma.production.findMany({
        orderBy: { date: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching production:', error);
      throw error;
    }
  });

  ipcMain.handle('production:save', async (_, data) => {
    try {
      return await prisma.production.create({
        data: {
          date: data.date,
          note: data.note,
          totalBoxes: data.totals.boxes,
          totalBatches: data.totals.batches,
          // Add additional production details as needed
        }
      });
    } catch (error) {
      console.error('Error saving production:', error);
      throw error;
    }
  });
}