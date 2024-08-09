import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

const AuthWrapper = () => {
  const { authUser = null } = useAuthContext();

  return authUser ? <Outlet /> : <Navigate to={'/login'} />;
};

export default AuthWrapper;
