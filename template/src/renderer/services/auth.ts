import { User, Agent } from '../types/auth';

interface LoginResponse {
  token: string;
  user: User | (Agent & { role: 'agent' });
  error?: string;
}

export async function login(role: string, password: string, email?: string): Promise<LoginResponse> {
  try {
    const response = await window.api.login({ role, password, email });
    
    if (response.error) {
      throw new Error(response.error);
    }

    // Store token and user info
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getCurrentUser(): User | (Agent & { role: 'agent' }) | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}