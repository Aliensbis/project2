import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    // Auth
    login: (data: any) => ipcRenderer.invoke('auth:login', data),
    
    // Orders
    getOrders: () => ipcRenderer.invoke('orders:getAll'),
    createOrder: (data: any) => ipcRenderer.invoke('orders:create', data),
    updateOrder: (id: string, data: any) => ipcRenderer.invoke('orders:update', id, data),
    deleteOrder: (id: string) => ipcRenderer.invoke('orders:delete', id),
    
    // Agents
    getAgents: () => ipcRenderer.invoke('agents:getAll'),
    createAgent: (data: any) => ipcRenderer.invoke('agents:create', data),
    updateAgent: (id: string, data: any) => ipcRenderer.invoke('agents:update', id, data),
    deleteAgent: (id: string) => ipcRenderer.invoke('agents:delete', id),
    
    // Customers
    getCustomers: () => ipcRenderer.invoke('customers:getAll'),
    createCustomer: (data: any) => ipcRenderer.invoke('customers:create', data),
    updateCustomer: (id: string, data: any) => ipcRenderer.invoke('customers:update', id, data),
    deleteCustomer: (id: string) => ipcRenderer.invoke('customers:delete', id),
    
    // Production
    getProduction: () => ipcRenderer.invoke('production:getAll'),
    saveProduction: (data: any) => ipcRenderer.invoke('production:save', data),
    
    // Inventory
    getInventory: () => ipcRenderer.invoke('inventory:getAll'),
    updateInventory: (data: any) => ipcRenderer.invoke('inventory:update', data)
  }
);