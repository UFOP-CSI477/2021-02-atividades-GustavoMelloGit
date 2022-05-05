import { Container } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const HomeContainer = styled(Container)`
  padding: 3rem 0;
  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const HomeCardContent = styled(Box)`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
