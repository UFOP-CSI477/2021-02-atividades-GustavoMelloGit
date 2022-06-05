import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import RegistersList from '../../../../components/RegistersList';
import api from '../../../../services/api';
import { Registers } from '../../../../shared/types/Registers';
import { getRegistersData } from '../../../../shared/utils/utils';
import { AdminListContainer } from '../../styles';
import CreateRegisters from '../Create';
import UpdateRegisters from '../Update';

const RegisterList: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [registers, setRegisters] = useState([] as Registers[]);
  const [registerSelected, setRegisterSelected] = useState<Registers | null>(
    null
  );

  const getData = async () => {
    setIsLoading(true);
    const registersResponse = await getRegistersData();
    if (registersResponse) {
      setRegisters(registersResponse);
    }
    setIsLoading(false);
  };

  const handleDeleteRegister = async (id: string) => {
    try {
      await api.delete(`/maintenance/delete/${id}`);
      toast.success('Registro deletado com sucesso!');
      getData();
    } catch (e) {
      toast.error('Erro ao deletar registro');
    }
  };

  const handleSelectRegister = (register: Registers) => {
    setRegisterSelected(register);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminListContainer>
      {registerSelected ? (
        <UpdateRegisters
          getData={getData}
          register={registerSelected}
          resetRegisterSelect={() => setRegisterSelected(null)}
        />
      ) : (
        <CreateRegisters getData={getData} />
      )}
      <RegistersList
        hasAction
        registers={registers}
        isLoading={isLoading}
        handleDelete={handleDeleteRegister}
        handleUpdate={handleSelectRegister}
      />
    </AdminListContainer>
  );
};
export default RegisterList;
