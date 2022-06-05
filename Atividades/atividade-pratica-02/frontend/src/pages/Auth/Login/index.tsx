import React, { useContext } from 'react';
import { Button, Divider, Typography, Box, Link } from '@mui/material';
import { Formik } from 'formik';
import InputTextFormik from '../../../components/InputTextFormik';
import api from '../../../services/api';
import { authContext } from '../../../shared/contexts/AuthContext';
import { parseJwt } from '../../../shared/utils/utils';
import { AuthFormStyled } from '../styles';
import toast from 'react-hot-toast';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  toggleForm: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const { setUser } = useContext(authContext);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await api.post('/login', values);
      const userParsed = parseJwt(response.data.token);
      setUser({
        email: userParsed.email,
        name: userParsed.name,
        id: userParsed.id,
        is_admin: userParsed.is_admin,
        token: response.data.token,
        created_at: userParsed.created_at,
      });
    } catch (e) {
      toast.error('Email e/ou senha incorretos!');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {() => (
        <AuthFormStyled>
          <h1>Login</h1>
          <Divider />
          <InputTextFormik
            label='E-mail'
            name='email'
            type='email'
            autoComplete='username'
          />
          <InputTextFormik
            label='Senha'
            name='password'
            type='password'
            autoComplete='current-password'
          />
          <Box textAlign='center'>
            <Button variant='contained' type='submit'>
              Entrar
            </Button>
          </Box>
          <Typography>
            Não possui uma conta? <Link onClick={toggleForm}>Cadastre-se</Link>
          </Typography>
        </AuthFormStyled>
      )}
    </Formik>
  );
};
export default LoginForm;
