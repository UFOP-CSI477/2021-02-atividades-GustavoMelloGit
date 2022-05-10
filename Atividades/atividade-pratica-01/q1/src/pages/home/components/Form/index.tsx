import React from 'react';
import { Button, MenuItem } from '@mui/material';
import {
  HomeActionsContainer,
  HomeFormContainer,
  HomeFormGrid,
} from './styles';
import {
  BanksInterface,
  HomeFormValues,
  PixKeysInterface,
} from '../../interfaces';
import { Formik, Form } from 'formik';
import { InputTextFormik } from '../../../../shared/components/Inputs/InputTextFormik';
import * as yup from 'yup';
import InputCurrencyFormik from '../../../../shared/components/Inputs/InputCurrencyFormik';

interface HomeFormProps {
  onSubmit: (values: HomeFormValues) => void;
  banksData: BanksInterface[];
}

const HomeFormComponent: React.FC<HomeFormProps> = ({
  onSubmit,
  banksData,
}) => {
  const keyTypes: PixKeysInterface = {
    cpf: {
      label: 'CPF',
      type: 'text',
    },
    cnpj: {
      label: 'CNPJ',
      type: 'text',
    },
    email: {
      label: 'E-mail',
      type: 'email',
    },
    phone: {
      label: 'Telefone',
      type: 'tel',
    },
    randomKey: {
      label: 'Chave aleatória',
      type: 'text',
    },
  };

  const validationSchema = yup.object().shape({
    keyType: yup.string().required('Selecione um tipo de chave'),
    keyValue: yup.string().required('Digite o valor da chave'),
    operationType: yup.string().required('Selecione o tipo de operação'),
    value: yup
      .number()
      .required('Digite o valor da operação')
      .min(1, 'Valor mínimo de 1 real'),
    date: yup.string().required('Digite a data da operação'),
    bank: yup.string().required('Selecione o banco'),
  });

  return (
    <Formik
      initialValues={
        {
          keyValue: '',
          keyType: '',
          operationType: 'send',
          value: 0,
          date: new Date().toISOString().split('T')[0],
          bank: '',
        } as HomeFormValues
      }
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form>
          <HomeFormContainer>
            <HomeFormGrid>
              <InputTextFormik select label='Tipo de chave' name='keyType'>
                {Object.entries(keyTypes).map((value) => (
                  <MenuItem key={value[0]} value={value[0]}>
                    {value[1].label}
                  </MenuItem>
                ))}
              </InputTextFormik>
              {values.keyType && (
                <React.Fragment>
                  <InputTextFormik
                    label={keyTypes[values.keyType].label}
                    name='keyValue'
                    type={keyTypes[values.keyType].type}
                  />
                  <InputTextFormik
                    select
                    label='Tipo da operação'
                    name='operationType'
                  >
                    <MenuItem value='send'>Enviar</MenuItem>
                    <MenuItem value='receive'>Receber</MenuItem>
                  </InputTextFormik>
                  <InputCurrencyFormik label='Valor' name='value' />
                  <InputTextFormik label='Data' name='date' type='date' />
                  <InputTextFormik select label='Banco' name='bank'>
                    {banksData
                      .filter((bank) => bank.code)
                      .map((value) => (
                        <MenuItem key={value.name} value={value.code}>
                          {value.name}
                        </MenuItem>
                      ))}
                  </InputTextFormik>
                </React.Fragment>
              )}
            </HomeFormGrid>
            <HomeActionsContainer>
              <Button color='error' variant='contained' type='reset'>
                Resetar
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Enviar
              </Button>
            </HomeActionsContainer>
          </HomeFormContainer>
        </Form>
      )}
    </Formik>
  );
};
export default React.memo(HomeFormComponent);
