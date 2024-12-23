import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  path: string;
  children: React.ReactNode;
}

export default function ProtectedRoute({ path, children }: ProtectedRouteProps) {
  const { isAuthenticated, canAccessRoute } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!canAccessRoute(path)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}