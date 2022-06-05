import { useContext } from 'react';
import { authContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { user } = useContext(authContext);
  return user;
};
export default useAuth;
