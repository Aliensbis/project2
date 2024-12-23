import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import RoleSelection from '../components/Auth/LoginPage/RoleSelection';
import LoginForm from '../components/Auth/LoginPage/LoginForm';
import AgentLoginForm from '../components/Auth/LoginPage/AgentLoginForm';

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'production' | 'admin' | 'agent' | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (password: string) => {
    if (!selectedRole) return;

    setIsLoading(true);
    setError('');

    try {
      const success = login(selectedRole, password);
      if (!success) {
        setError('Password non valida');
      }
    } catch (err) {
      setError('Si è verificato un errore durante l\'accesso');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const success = login('agent', password, email);
      if (!success) {
        setError('Credenziali non valide');
      }
    } catch (err) {
      setError('Si è verificato un errore durante l\'accesso');
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedRole) {
    return <RoleSelection onSelectRole={setSelectedRole} />;
  }

  if (selectedRole === 'agent') {
    return (
      <AgentLoginForm
        onBack={() => {
          setSelectedRole(null);
          setError('');
        }}
        onLogin={handleAgentLogin}
        error={error}
        isLoading={isLoading}
      />
    );
  }

  return (
    <LoginForm
      role={selectedRole}
      onBack={() => {
        setSelectedRole(null);
        setError('');
      }}
      onSubmit={handleLogin}
      error={error}
      isLoading={isLoading}
    />
  );
}