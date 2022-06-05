import React, { useEffect, useState } from 'react';
import { HomeContainer } from './styles';
import EquipmentsList from '../../components/EquipmentsList';
import RegistersList from '../../components/RegistersList';
import { Equipment } from '../../shared/types/Equipment';
import { getEquipmentsData, getRegistersData } from '../../shared/utils/utils';
import { Registers } from '../../shared/types/Registers';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [equipments, setEquipments] = useState([] as Equipment[]);
  const [registers, setRegisters] = useState([] as Registers[]);

  const getData = async () => {
    setIsLoading(true);
    const equipmentsResponse = await getEquipmentsData();
    if (equipmentsResponse) {
      setEquipments(equipmentsResponse);
    }
    const registersResponse = await getRegistersData();
    if (registersResponse) {
      setRegisters(registersResponse);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <HomeContainer>
      <EquipmentsList equipments={equipments} isLoading={isLoading} />
      <RegistersList registers={registers} isLoading={isLoading} />
    </HomeContainer>
  );
};
export default React.memo(HomePage);
