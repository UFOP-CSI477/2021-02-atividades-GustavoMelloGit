import { Box, styled } from '@mui/material';
import { Form } from 'formik';

export const AdminPageContainer = styled(Box)``;

export const AdminPageTabs = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const AdminPageForm = styled(Form)`
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const FormFieldsWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
export const AdminFormActionContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

export const AdminListContainer = styled(Box)`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
