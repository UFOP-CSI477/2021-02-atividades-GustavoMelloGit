import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useAuth();

  if (!Object.values(user).length) {
    return <Navigate to='/auth' />;
  }
  return children;
};
export default React.memo(ProtectedRoute);
