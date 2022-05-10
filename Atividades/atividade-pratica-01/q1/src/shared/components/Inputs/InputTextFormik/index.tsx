import React from 'react';
import { useField } from 'formik';
import { BaseTextFieldProps, TextField } from '@mui/material';

export interface InputTextFormikProps extends Partial<BaseTextFieldProps> {
  name: string;
  variant?: 'standard' | 'filled' | 'outlined';
  [key: string]: unknown;
  value?: string | number;
  containerStyles?: React.CSSProperties;
}

export const InputTextFormik: React.FC<InputTextFormikProps> = ({
  name,
  variant = 'outlined',
  containerStyles,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      {...rest}
      {...field}
      variant={variant}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
