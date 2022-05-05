import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
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
import { Formik, Form, Field } from 'formik';
import api from '../../../../api';

interface HomeFormProps {
  onSubmit: (values: HomeFormValues) => void;
}

const HomeFormComponent: React.FC<HomeFormProps> = ({ onSubmit }) => {
  const [banksData, setBanksData] = useState([] as BanksInterface[]);

  const keyTypes: PixKeysInterface = {
    cpf: {
      label: 'CPF',
      mask: '999.999.999-99',
      type: 'text',
    },
    cnpj: {
      label: 'CNPJ',
      mask: '99.999.999/9999-99',
      type: 'text',
    },
    email: {
      label: 'E-mail',
      mask: '',
      type: 'email',
    },
    phone: {
      label: 'Telefone',
      mask: '(99) 9999-9999',
      type: 'tel',
    },
    randomKey: {
      label: 'Chave aleatória',
      mask: '',
      type: 'text',
    },
  };

  const getBanksData = async () => {
    try {
      const response = await api.get('/banks/v1');
      setBanksData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBanksData();
  }, []);

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
      validateOnChange={false}
    >
      {({ values }) => (
        <Form>
          <HomeFormContainer>
            <HomeFormGrid>
              <FormControl fullWidth>
                <InputLabel id='keyType'>Tipo de chave</InputLabel>
                <Field
                  as={Select}
                  labelId='keyType'
                  label='Tipo de chave'
                  fullWidth
                  name='keyType'
                >
                  {Object.entries(keyTypes).map((value) => (
                    <MenuItem key={value[0]} value={value[0]}>
                      {value[1].label}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              {values.keyType && (
                <React.Fragment>
                  <Field
                    as={TextField}
                    fullWidth
                    label={keyTypes[values.keyType].label}
                    name='keyValue'
                    type={keyTypes[values.keyType].type}
                    variant='outlined'
                  />
                  <FormControl fullWidth>
                    <InputLabel id='operationType'>Tipo da operação</InputLabel>
                    <Field
                      as={Select}
                      labelId='operationType'
                      label='Tipo da operação'
                      fullWidth
                      name='operationType'
                    >
                      <MenuItem value='send'>Enviar</MenuItem>
                      <MenuItem value='receive'>Receber</MenuItem>
                    </Field>
                  </FormControl>
                  <Field
                    as={TextField}
                    fullWidth
                    label='Valor'
                    name='value'
                    type='number'
                    variant='outlined'
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label='Data'
                    name='date'
                    type='date'
                    variant='outlined'
                  />
                  <FormControl fullWidth>
                    <InputLabel id='bank'>Banco</InputLabel>
                    <Field
                      as={Select}
                      labelId='bank'
                      label='Banco'
                      fullWidth
                      name='bank'
                    >
                      {banksData.map((value) => (
                        <MenuItem key={value.name} value={value.code}>
                          {value.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </React.Fragment>
              )}
            </HomeFormGrid>
            <HomeActionsContainer>
              <Button color='warning' variant='contained' type='reset'>
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
