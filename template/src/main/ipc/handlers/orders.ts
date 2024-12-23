import { IpcMain } from 'electron';
import { getPrismaClient } from '../../database';

export function setupOrderHandlers(ipcMain: IpcMain) {
  const prisma = getPrismaClient();

  ipcMain.handle('orders:getAll', async () => {
    try {
      return await prisma.order.findMany({
        include: {
          customer: true,
          items: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  });

  ipcMain.handle('orders:create', async (_, data) => {
    try {
      return await prisma.order.create({
        data: {
          customerId: data.customerId,
          status: 'pending',
          totalPallets: data.totalPallets,
          notes: data.notes,
          items: {
            create: data.items.map((item: any) => ({
              productId: item.productId,
              boxes: item.boxes,
              completed: 0
            }))
          }
        },
        include: {
          customer: true,
          items: true
        }
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  });

  ipcMain.handle('orders:update', async (_, id, data) => {
    try {
      return await prisma.order.update({
        where: { id },
        data: {
          status: data.status,
          notes: data.notes,
          items: {
            updateMany: data.items.map((item: any) => ({
              where: { id: item.id },
              data: { completed: item.completed }
            }))
          }
        },
        include: {
          customer: true,
          items: true
        }
      });
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  });

  ipcMain.handle('orders:delete', async (_, id) => {
    try {
      await prisma.orderItem.deleteMany({
        where: { orderId: id }
      });
      return await prisma.order.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  });
}