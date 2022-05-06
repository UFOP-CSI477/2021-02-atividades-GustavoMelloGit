import { TextField } from '@mui/material';
import React, { useState } from 'react';

interface CurrencyInputProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
}
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  fieldValue,
  setFieldValue,
}) => {
  function formatCurrency(value: string) {
    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat('pt-BR', options).format(
      parseFloat(value) / 100
    );

    if (result === 'NaN') {
      return 'R$0,00';
    }
    if (typeof result === 'string') {
      return 'R$' + result;
    }
    return 'R$';
  }

  return (
    <TextField
      variant='outlined'
      fullWidth
      value={formatCurrency((+fieldValue * 100).toString())}
      onChange={(e) => {
        const value = e.target.value
          .replace('.', '')
          .replace(',', '')
          .replace(/\D/g, '');
        setFieldValue((+value / 100).toString());
      }}
    />
  );
};
export default React.memo(CurrencyInput);
