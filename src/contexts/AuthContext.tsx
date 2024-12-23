import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, AuthContextType } from '../types/Auth';
import { AUTH_CONFIG } from '../config/auth';
import { useAgents } from '../hooks/useAgents';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = sessionStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const { agents } = useAgents();

  const login = useCallback((role: string, password: string, email?: string): boolean => {
    if (role === 'agent' && email) {
      const agent = agents.find(a => 
        a.email === email && 
        a.password === password && 
        a.active
      );

      if (!agent) return false;

      const newUser: User = {
        id: agent.id,
        role: 'agent',
        allowedRoutes: ['/orders', '/customers', '/complaints'],
        name: agent.name,
        agentId: agent.id
      };

      setUser(newUser);
      sessionStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }

    const config = AUTH_CONFIG[role];
    if (!config || password !== config.password) {
      return false;
    }

    const newUser: User = {
      id: role,
      role: config.role,
      allowedRoutes: config.allowedRoutes,
      name: config.name
    };

    setUser(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    return true;
  }, [agents]);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('user');
  }, []);

  const canAccessRoute = useCallback((path: string): boolean => {
    return user?.allowedRoutes?.includes(path) ?? false;
  }, [user?.allowedRoutes]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      canAccessRoute,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}