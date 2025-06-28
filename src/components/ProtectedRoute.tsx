import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, Permission, FeatureAccess } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
  requiredPermission?: {
    feature: keyof FeatureAccess;
    permission: Permission;
  };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = [], 
  requiredPermission 
}) => {
  const { user, loading, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    // Determine which login page to redirect to based on the current path
    let loginPath = '/login';
    
    if (location.pathname.startsWith('/admin')) {
      loginPath = '/admin/login';
    }
    
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    let redirectPath = '/';
    
    switch (user.role) {
      case 'partner':
        redirectPath = '/partner/dashboard';
        break;
      case 'manager':
        redirectPath = '/manager/dashboard';
        break;
      case 'kitchen':
        redirectPath = '/kitchen/orders';
        break;
      case 'servant':
        redirectPath = '/servant/orders';
        break;
      case 'admin':
        redirectPath = '/admin/dashboard';
        break;
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  // Check if user has required permission (if specified)
  if (requiredPermission) {
    const { feature, permission } = requiredPermission;
    
    if (!hasPermission(feature, permission)) {
      // Redirect to appropriate dashboard based on role
      let redirectPath = '/';
      
      switch (user.role) {
        case 'partner':
          redirectPath = '/partner/dashboard';
          break;
        case 'manager':
          redirectPath = '/manager/dashboard';
          break;
        case 'kitchen':
          redirectPath = '/kitchen/orders';
          break;
        case 'servant':
          redirectPath = '/servant/orders';
          break;
        case 'admin':
          redirectPath = '/admin/dashboard';
          break;
      }
      
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;