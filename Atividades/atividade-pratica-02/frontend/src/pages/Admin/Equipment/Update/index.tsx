import React from 'react';
import toast from 'react-hot-toast';
import api from '../../../../services/api';
import { Equipment } from '../../../../shared/types/Equipment';
import EquipmentForm, { EquipmentFormValues } from '../Form';

interface UpdateEquipmentProps {
  getData: () => Promise<void>;
  equipmentSelected: Equipment;
  resetEquipmentSelected: () => void;
}
const UpdateEquipment: React.FC<UpdateEquipmentProps> = ({
  getData,
  equipmentSelected,
  resetEquipmentSelected,
}) => {
  const handleUpdateEquipment = async (equipment: EquipmentFormValues) => {
    try {
      await api.put(`/equipments/update/${equipmentSelected.id}`, equipment);
      resetEquipmentSelected();
      getData();
      toast.success('Equipamento atualizado com sucesso!');
    } catch (e) {
      toast.error('Erro ao atualizar equipamento');
    }
  };
  return (
    <EquipmentForm
      onSubmit={handleUpdateEquipment}
      initialValues={{
        name: equipmentSelected.name,
      }}
    />
  );
};
export default UpdateEquipment;
