import React from 'react';
import { BaseTextFieldProps, InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';

export interface InputCurrencyFormikProps extends Partial<BaseTextFieldProps> {
  name: string;
  variant?: 'standard' | 'filled' | 'outlined';
  [key: string]: unknown;
  value?: string | number;
}

const InputCurrencyFormik: React.FC<InputCurrencyFormikProps> = ({
  name,
  variant = 'outlined',
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const errorText = meta.error && meta.touched ? meta.error : '';

  function formatCurrency(value: number) {
    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat('pt-BR', options).format(value / 100);

    return result;
  }

  return (
    <TextField
      {...rest}
      {...field}
      variant={variant}
      helperText={errorText}
      fullWidth
      error={!!errorText}
      value={formatCurrency(field.value * 100)}
      onChange={(e) => {
        const value = e.target.value
          .replace('.', '')
          .replace(',', '')
          .replace(/\D/g, '');
        setValue(+value / 100);
      }}
      InputProps={{
        startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
      }}
    />
  );
};
export default InputCurrencyFormik;
