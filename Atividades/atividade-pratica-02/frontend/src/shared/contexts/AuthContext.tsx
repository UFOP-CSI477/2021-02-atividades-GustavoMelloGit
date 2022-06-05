import React, { createContext, useCallback, useEffect, useState } from 'react';
import api, { setBearerToken } from '../../services/api';
import { FunctionalComponentProps } from '../types/FunctionalComponent';
import { User } from '../types/User';

interface AuthContextProps {
  user: User;
  setUser: (user: User) => void;
  isFetching: boolean;
}

export const authContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const AuthContextProvider: React.FC<FunctionalComponentProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  const setUserContext = (user: User) => {
    setBearerToken(user.token);
    setUser(user);
    localStorage.setItem('token', user.token);
    localStorage.setItem('user_uuid', user.id);
  };

  const verifyTokenIsValid = useCallback(async () => {
    const token = localStorage.getItem('token');
    const user_uuid = localStorage.getItem('user_uuid');
    if (!token) {
      setUser({} as User);
      return;
    }
    setBearerToken(token);

    try {
      setIsLoading(true);
      const response = await api.get(`/users/${user_uuid}`);
      const { data } = response;
      setUser({
        email: data.email,
        name: data.name,
        id: data.id,
        is_admin: data.is_admin,
        created_at: data.created_at,
        token: response.data.token,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyTokenIsValid();
  }, [verifyTokenIsValid]);

  return (
    <authContext.Provider
      value={{ user, setUser: setUserContext, isFetching: isLoading }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
