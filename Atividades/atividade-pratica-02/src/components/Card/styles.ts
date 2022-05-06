import { Card } from '@mui/material';
import styled from 'styled-components';

export const StyledCardComponent = styled(Card)`
  padding: 2rem;
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
