import { useField } from 'formik';
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type InputTextFormikProps = TextFieldProps & {
  name: string;
};
const InputTextFormik: React.FC<InputTextFormikProps> = ({ name, ...rest }) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      fullWidth
      helperText={errorText}
      error={Boolean(errorText)}
      InputLabelProps={{ shrink: true }}
      {...rest}
      {...field}
    />
  );
};
export default InputTextFormik;
