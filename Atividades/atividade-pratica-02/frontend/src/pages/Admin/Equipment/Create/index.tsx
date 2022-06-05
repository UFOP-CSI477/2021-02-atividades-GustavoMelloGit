import React from 'react';
import toast from 'react-hot-toast';
import api from '../../../../services/api';
import EquipmentForm, { EquipmentFormValues } from '../Form';

interface CreateEquipmentProps {
  getData: () => Promise<void>;
}
const CreateEquipment: React.FC<CreateEquipmentProps> = ({ getData }) => {
  const onCreateEquipment = async (values: EquipmentFormValues) => {
    try {
      await api.post('/equipments/create', values);
      toast.success('Equipamento criado com sucesso!');
      getData();
    } catch (e) {
      toast.error('Erro ao criar equipamento!');
    }
  };

  return (
    <EquipmentForm initialValues={{ name: '' }} onSubmit={onCreateEquipment} />
  );
};
export default CreateEquipment;
