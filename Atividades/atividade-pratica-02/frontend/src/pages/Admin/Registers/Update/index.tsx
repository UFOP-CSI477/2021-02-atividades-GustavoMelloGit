import React from 'react';
import toast from 'react-hot-toast';
import api from '../../../../services/api';
import { Registers } from '../../../../shared/types/Registers';
import RegistersForm, { RegisterFormValues } from '../Form';

interface UpdateRegisterProps {
  getData: () => Promise<void>;
  register: Registers;
  resetRegisterSelect: () => void;
}
const UpdateRegisters: React.FC<UpdateRegisterProps> = ({
  getData,
  register,
  resetRegisterSelect,
}) => {
  const handleUpdateRegister = async (values: RegisterFormValues) => {
    try {
      await api.put(`/maintenance/update/${register.id}`, values);
      resetRegisterSelect();
      getData();
      toast.success('Registro atualizado com sucesso!');
    } catch (e) {
      toast.error('Erro ao atualizar registro');
    }
  };

  return (
    <RegistersForm
      onSubmit={handleUpdateRegister}
      initialValues={{
        description: register.description,
        deadline: register.deadline.split('T')[0],
        type: register.type,
        equipment_id: register.equipment.id,
      }}
    />
  );
};
export default UpdateRegisters;
