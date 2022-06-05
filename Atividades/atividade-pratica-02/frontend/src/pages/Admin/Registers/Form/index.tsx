import { Box, Button, Card, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InputTextFormik from '../../../../components/InputTextFormik';
import { Equipment } from '../../../../shared/types/Equipment';
import {
  dateFormatter,
  getEquipmentsData,
} from '../../../../shared/utils/utils';
import {
  AdminFormActionContainer,
  AdminPageForm,
  FormFieldsWrapper,
} from '../../styles';

export interface RegisterFormValues {
  description: string;
  deadline: string;
  type: number;
  equipment_id: string;
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => Promise<void>;
  initialValues: RegisterFormValues;
}
const RegistersForm: React.FC<RegisterFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [equipments, setEquipments] = useState([] as Equipment[]);

  const getEquipments = async () => {
    try {
      const response = await getEquipmentsData();
      if (response) {
        setEquipments(response);
      }
    } catch (e) {
      toast.error('Erro ao buscar equipamentos');
    }
  };

  useEffect(() => {
    getEquipments();
    return () => {
      setEquipments([]);
    };
  }, []);

  return (
    <Box component={Card} p={3}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await onSubmit({
            ...values,
            deadline: dateFormatter(values.deadline),
          });
          setSubmitting(false);
        }}
      >
        {() => (
          <AdminPageForm>
            <FormFieldsWrapper>
              <InputTextFormik label='Descrição' name='description' />
              <InputTextFormik
                label='Data limite'
                name='deadline'
                type='date'
              />
              <InputTextFormik select label='Tipo' name='type'>
                <MenuItem value={1}>Preventiva</MenuItem>
                <MenuItem value={2}>Corretiva</MenuItem>
                <MenuItem value={3}>Urgente</MenuItem>
              </InputTextFormik>
              <InputTextFormik select label='Equipamento' name='equipment_id'>
                {equipments.map((equipment) => (
                  <MenuItem key={equipment.id} value={equipment.id}>
                    {equipment.name}
                  </MenuItem>
                ))}
              </InputTextFormik>
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
export default RegistersForm;
