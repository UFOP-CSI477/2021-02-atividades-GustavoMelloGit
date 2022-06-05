import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Equipment } from '../../shared/types/Equipment';
import { dateFormatter } from '../../shared/utils/utils';
import { IconButton } from '@mui/material';
import { DeleteOutline, ModeEditOutlined } from '@mui/icons-material';

interface EquipmentsListProps {
  equipments: Equipment[];
  isLoading: boolean;
  hasAction?: boolean;
  handleDelete?: (id: string) => void;
  handleUpdate?: (equipment: Equipment) => void;
}
const EquipmentsList: React.FC<EquipmentsListProps> = ({
  equipments,
  isLoading,
  hasAction = false,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <DataGrid
      loading={isLoading}
      disableSelectionOnClick
      autoHeight
      columns={[
        { field: 'name', headerName: 'Nome do equipamento', flex: 1 },
        {
          field: 'created_at',
          headerName: 'Data de criação',
          flex: 1,
          valueGetter: (params: GridValueGetterParams) => {
            return dateFormatter(params.row.created_at);
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
      rows={equipments}
    />
  );
};
export default EquipmentsList;
