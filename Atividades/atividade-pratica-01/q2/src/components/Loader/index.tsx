import React from 'react';
import { Box } from '@mui/system';
import { CircularProgress, CircularProgressProps } from '@mui/material';

const LoaderComponent: React.FC<CircularProgressProps> = (props) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100%'
    >
      <CircularProgress {...props} />
    </Box>
  );
};
export default LoaderComponent;
