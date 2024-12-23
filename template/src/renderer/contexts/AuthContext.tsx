import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, AuthContextType } from '../types/Auth';
import { login as authLogin, logout as authLogout } from '../services/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (role: string, password: string, email?: string) => {
    try {
      const response = await authLogin(role, password, email);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
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