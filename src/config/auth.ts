import { AuthConfig, Agent } from '../types/Auth';

export const AUTH_CONFIG: Record<string, AuthConfig> = {
  production: {
    role: 'production',
    password: 'prod2024',
    name: 'Area Produzione',
    allowedRoutes: ['/production', '/inventory', '/orders', '/statistics', '/purchases', '/complaints']
  },
  admin: {
    role: 'admin',
    password: 'admin2024',
    name: 'Area Amministrazione',
    allowedRoutes: ['/statistics', '/recipes', '/orders', '/purchases', '/complaints', '/agents']
  },
  agent: {
    role: 'agent',
    password: '', // Dynamic per agent
    name: 'Area Agenti',
    allowedRoutes: ['/orders', '/customers', '/complaints']
  }
};

// Example agent data
export const EXAMPLE_AGENT: Agent = {
  id: 'AG001',
  name: 'Luca Rossi',
  email: 'luca.rossi@example.com',
  phone: '333-1234567',
  password: 'luca2024',
  createdAt: new Date().toISOString(),
  active: true,
  customers: ['CUST001', 'CUST002', 'CUST003']
};

// Example customers for Luca
export const EXAMPLE_CUSTOMERS = [
  {
    id: 'CUST001',
    name: 'Bar Milano',
    address: 'Via Roma 123, Milano',
    phone: '02-1234567',
    email: 'info@barmilano.it'
  },
  {
    id: 'CUST002',
    name: 'Pasticceria Venezia',
    address: 'Via Garibaldi 45, Venezia',
    phone: '041-7654321',
    email: 'ordini@pasticceriavenezia.it'
  },
  {
    id: 'CUST003',
    name: 'Caffè Torino',
    address: 'Corso Vittorio 78, Torino',
    phone: '011-9876543',
    email: 'acquisti@caffetorino.it'
  }
];