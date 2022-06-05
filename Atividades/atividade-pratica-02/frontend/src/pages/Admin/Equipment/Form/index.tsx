import React from 'react';
import { Card, Box, Button } from '@mui/material';
import { Formik } from 'formik';
import {
  AdminFormActionContainer,
  AdminPageForm,
  FormFieldsWrapper,
} from '../../styles';
import InputTextFormik from '../../../../components/InputTextFormik';

export interface EquipmentFormValues {
  name: string;
}

interface EquipmentFormProps {
  onSubmit: (values: EquipmentFormValues) => Promise<void>;
  initialValues: EquipmentFormValues;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Box component={Card} p={3}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await onSubmit(values);
          setSubmitting(false);
        }}
      >
        {() => (
          <AdminPageForm>
            <FormFieldsWrapper>
              <InputTextFormik label='Nome do equipamento' name='name' />
            </FormFieldsWrapper>

            <AdminFormActionContainer>
              <Button variant='contained' color='error'>
                Cancelar
              </Button>
              <Button variant='contained' type='submit'>
                Salvar
              </Button>
            </AdminFormActionContainer>
          </AdminPageForm>
        )}
      </Formik>
    </Box>
  );
};
export default EquipmentForm;
