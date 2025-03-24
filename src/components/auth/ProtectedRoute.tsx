import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '@/store/store';

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useStore(state => !!state.authData);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, saving the attempted location for potential redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Return children if provided, otherwise return Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};
