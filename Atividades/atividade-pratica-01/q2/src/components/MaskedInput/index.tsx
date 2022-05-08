import { TextField } from '@mui/material';
import React from 'react';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';

interface MaskedInputProps extends InputMaskProps {}

const MaskedInputComponent: React.FC<MaskedInputProps> = ({ ...rest }) => {
  //@ts-ignore
  return <InputMask {...rest}>{(props) => <TextField {...props} />}</InputMask>;
};
export default MaskedInputComponent;
