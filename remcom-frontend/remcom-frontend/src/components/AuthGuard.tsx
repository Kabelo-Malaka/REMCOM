import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactElement;
  allowedRoles: string[];
}

const getRoleFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    // JWT payload is in the second part, base64url encoded
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = getRoleFromToken();
  if (!token || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthGuard;
