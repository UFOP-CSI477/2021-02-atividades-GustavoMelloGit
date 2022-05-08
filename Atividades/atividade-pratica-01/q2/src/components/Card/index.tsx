import React from 'react';
import { CardProps } from '@mui/material';
import { StyledCardComponent } from './styles';

interface CardComponentProps extends CardProps {
  children: React.ReactNode;
}
const CardComponent: React.FC<CardComponentProps> = ({ children, ...rest }) => {
  return (
    <StyledCardComponent variant='outlined' {...rest}>
      {children}
    </StyledCardComponent>
  );
};
export default CardComponent;
