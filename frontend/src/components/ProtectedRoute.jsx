import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, admin = false }) => {
  const { user, admin: adminUser } = useAuth();

  if (admin) {
    return adminUser ? children : <Navigate to="/login" />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;