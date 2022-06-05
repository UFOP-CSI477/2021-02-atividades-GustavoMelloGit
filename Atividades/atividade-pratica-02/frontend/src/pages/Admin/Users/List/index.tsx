import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../../../services/api';
import { User } from '../../../../shared/types/User';
import { dateFormatter } from '../../../../shared/utils/utils';

const UsersList: React.FC = (props) => {
  const [allUsers, setAllUsers] = useState([] as User[]);

  const getAllUsers = async () => {
    try {
      const response = await api.get('/users');
      setAllUsers(response.data);
    } catch (e) {
      toast.error('Erro ao carregar usuários');
    }
  };
  useEffect(() => {
    getAllUsers();

    return () => {
      setAllUsers([]);
    };
  }, []);

  return (
    <DataGrid
      columns={[
        {
          field: 'name',
          headerName: 'Nome',
          flex: 1,
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'created_at',
          headerName: 'Criado em',
          flex: 1,
          valueGetter: (params) => {
            return dateFormatter(params.row.created_at);
          },
        },
      ]}
      autoHeight
      rows={allUsers}
    />
  );
};
export default UsersList;
