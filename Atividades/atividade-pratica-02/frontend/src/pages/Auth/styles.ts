import { styled, Box } from '@mui/material';
import { Form } from 'formik';

export const AuthContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthFormStyled = styled(Form)`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
