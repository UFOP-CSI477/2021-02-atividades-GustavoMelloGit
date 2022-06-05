import React, { useContext, useState } from 'react';
import { Box, Card } from '@mui/material';
import { AuthContainer } from './styles';
import LoginForm from './Login';
import { authContext } from '../../shared/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import SignupForm from './Signup';

const AuthPage: React.FC = () => {
  const [formState, setFormState] = useState<'login' | 'signup'>('login');
  const { user } = useContext(authContext);

  const toggleForm = () => {
    setFormState((prev) => (prev === 'login' ? 'signup' : 'login'));
  };
  if (Object.values(user).length) {
    return <Navigate to='/admin' />;
  }
  return (
    <AuthContainer>
      <Box component={Card} p={2} width='40%' maxWidth={500} minWidth={300}>
        {formState === 'login' ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <SignupForm toggleForm={toggleForm} />
        )}
      </Box>
    </AuthContainer>
  );
};
export default AuthPage;
