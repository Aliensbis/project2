import { IpcMain } from 'electron';
import { setupAuthHandlers } from './handlers/auth';
import { setupOrderHandlers } from './handlers/orders';
import { setupAgentHandlers } from './handlers/agents';
import { setupCustomerHandlers } from './handlers/customers';
import { setupProductionHandlers } from './handlers/production';
import { setupInventoryHandlers } from './handlers/inventory';

export function setupIPC(ipcMain: IpcMain) {
  setupAuthHandlers(ipcMain);
  setupOrderHandlers(ipcMain);
  setupAgentHandlers(ipcMain);
  setupCustomerHandlers(ipcMain);
  setupProductionHandlers(ipcMain);
  setupInventoryHandlers(ipcMain);
}