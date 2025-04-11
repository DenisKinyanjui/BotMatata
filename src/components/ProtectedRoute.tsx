import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock authentication - replace with actual auth logic
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;