export type UserRole = 'production' | 'admin' | 'agent';

export interface User {
  id: string;
  role: UserRole;
  allowedRoutes: string[];
  name: string;
  agentId?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: string, password: string, email?: string) => boolean;
  logout: () => void;
  canAccessRoute: (path: string) => boolean;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  createdAt: string;
  active: boolean;
  customers: string[];
}