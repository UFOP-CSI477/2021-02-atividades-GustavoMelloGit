import React from 'react';
import toast from 'react-hot-toast';
import api from '../../../../services/api';
import RegistersForm, { RegisterFormValues } from '../Form';

interface CreateRegisterProps {
  getData: () => Promise<void>;
}
const CreateRegisters: React.FC<CreateRegisterProps> = ({ getData }) => {
  const onCreateRegister = async (values: RegisterFormValues) => {
    try {
      await api.post('/maintenance/new', values);
      toast.success('Registro criado com sucesso!');
      getData();
    } catch (e) {
      toast.error('Erro ao criar registro!');
    }
  };
  return (
    <RegistersForm
      initialValues={{
        description: '',
        deadline: '',
        type: 1,
        equipment_id: '',
      }}
      onSubmit={onCreateRegister}
    />
  );
};
export default CreateRegisters;
