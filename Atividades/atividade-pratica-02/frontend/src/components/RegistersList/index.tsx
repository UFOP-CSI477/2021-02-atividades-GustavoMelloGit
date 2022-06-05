import React from 'react';
import { DeleteOutline, ModeEditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Registers } from '../../shared/types/Registers';
import { dateFormatter } from '../../shared/utils/utils';

interface RegistersListProps {
  registers: Registers[];
  isLoading: boolean;
  hasAction?: boolean;
  handleDelete?: (id: string) => void;
  handleUpdate?: (equipment: Registers) => void;
}
const RegistersList: React.FC<RegistersListProps> = ({
  registers,
  isLoading,
  handleDelete,
  handleUpdate,
  hasAction,
}) => {
  const getRegisterType = (type: number) => {
    switch (type) {
      case 1:
        return 'Preventiva';
      case 2:
        return 'Corretiva';
      case 3:
        return 'Urgente';
      default:
        return 'Não identificado';
    }
  };

  return (
    <DataGrid
      autoHeight
      disableSelectionOnClick
      columns={[
        {
          field: 'equipment_name',
          headerName: 'Nome do equipamento',
          flex: 1,
          valueGetter: (params: GridValueGetterParams) =>
            params.row.equipment.name,
        },
        {
          field: 'user_name',
          headerName: 'Nome do usuário',
          flex: 1,
          valueGetter: (params: GridValueGetterParams) => params.row.user.name,
        },
        {
          field: 'type',
          headerName: 'Tipo de manutenção',
          flex: 1,
          valueGetter: (params: GridValueGetterParams) =>
            getRegisterType(params.row.type),
        },
        { field: 'description', headerName: 'Descrição', flex: 1 },
        {
          field: 'deadline',
          headerName: 'Prazo',
          flex: 1,
          valueGetter: (params: GridValueGetterParams) => {
            return dateFormatter(params.row.deadline);
          },
        },
        ...(hasAction
          ? ([
              {
                field: 'id',
                headerName: 'Ações',
                flex: 1,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params: GridValueGetterParams) => {
                  return (
                    <>
                      <IconButton
                        onClick={handleDelete?.bind(this, params.row.id)}
                      >
                        <DeleteOutline color='error' />
                      </IconButton>
                      <IconButton
                        onClick={handleUpdate?.bind(this, params.row)}
                      >
                        <ModeEditOutlined color='primary' />
                      </IconButton>
                    </>
                  );
                },
              },
            ] as GridColDef[])
          : []),
      ]}
      rows={registers}
    />
  );
};
export default RegistersList;
