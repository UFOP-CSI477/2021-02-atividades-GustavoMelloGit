import React from 'react';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { Formik } from 'formik';
import { AuthFormStyled } from '../styles';
import InputTextFormik from '../../../components/InputTextFormik';
import api from '../../../services/api';
import toast from 'react-hot-toast';

interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

interface SignupFormProps {
  toggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ toggleForm }) => {
  const handleSignup = async (values: SignupFormValues) => {
    try {
      await api.post('/users/create', values);
      toggleForm();
      toast.success('Usuário criado com sucesso!');
    } catch (e) {
      toast.error('Erro ao criar usuário!');
    }
  };

  return (
    <Formik
      initialValues={
        {
          email: '',
          password: '',
          name: '',
        } as SignupFormValues
      }
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleSignup(values);
        setSubmitting(false);
      }}
    >
      {() => (
        <AuthFormStyled>
          <h1>Signup</h1>
          <Divider />
          <InputTextFormik label='Nome' name='name' autoComplete='name' />
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
            Já possui uma conta? <Link onClick={toggleForm}>Entre</Link>
          </Typography>
        </AuthFormStyled>
      )}
    </Formik>
  );
};
export default SignupForm;
