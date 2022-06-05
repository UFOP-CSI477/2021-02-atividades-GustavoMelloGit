import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import EquipmentsList from '../../../../components/EquipmentsList';
import api from '../../../../services/api';
import { Equipment } from '../../../../shared/types/Equipment';
import { getEquipmentsData } from '../../../../shared/utils/utils';
import { AdminListContainer } from '../../styles';
import CreateEquipment from '../Create';
import UpdateEquipment from '../Update';

const EquipmentList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [equipments, setEquipments] = useState([] as Equipment[]);
  const [equipmentSelected, setEquipmentSelected] =
    useState<Equipment | null>();

  const getData = async () => {
    setIsLoading(true);
    const equipmentsResponse = await getEquipmentsData();
    if (equipmentsResponse) {
      setEquipments(equipmentsResponse);
    }
    setIsLoading(false);
  };

  const handleSelectEquipment = (equipment: Equipment) => {
    setEquipmentSelected(equipment);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/equipments/delete/${id}`);
      getData();
      toast.success('Equipamento deletado com sucesso!');
    } catch (e) {
      toast.error('Erro ao deletar equipamento');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminListContainer>
      {equipmentSelected ? (
        <UpdateEquipment
          getData={getData}
          equipmentSelected={equipmentSelected}
          resetEquipmentSelected={() => setEquipmentSelected(null)}
        />
      ) : (
        <CreateEquipment getData={getData} />
      )}
      <EquipmentsList
        handleDelete={handleDelete}
        handleUpdate={handleSelectEquipment}
        hasAction
        equipments={equipments}
        isLoading={isLoading}
      />
    </AdminListContainer>
  );
};
export default EquipmentList;
