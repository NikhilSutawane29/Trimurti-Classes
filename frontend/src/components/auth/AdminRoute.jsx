import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * AdminRoute Component
 *
 * Protects routes that require admin privileges.
 * If the user is not logged in or not an admin, they will be redirected.
 */
const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  // Redirect to home if authenticated but not an admin
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if authenticated and is an admin
  return <Outlet />;
};

export default AdminRoute;
