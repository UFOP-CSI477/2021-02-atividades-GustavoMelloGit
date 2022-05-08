import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import LoaderComponent from '../../../../components/Loader';

type SelectCurrencyProps = TextFieldProps & {
  value: string;
  setValue: (value: string) => void;
  options: JSX.Element[];
  isLoading?: boolean;
};
const SelectCurrency: React.FC<SelectCurrencyProps> = ({
  value,
  setValue,
  options,
  isLoading,
  ...rest
}) => {
  return (
    <TextField
      select
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: isLoading && <LoaderComponent size={25} />,
      }}
      disabled={isLoading}
      {...rest}
    >
      {options}
    </TextField>
  );
};
export default SelectCurrency;
