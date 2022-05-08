import styled from 'styled-components';
import { Box } from '@mui/material';

export const HomeFormContainer = styled(Box)`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const HomeActionsContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const HomeFormGrid = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
`;
