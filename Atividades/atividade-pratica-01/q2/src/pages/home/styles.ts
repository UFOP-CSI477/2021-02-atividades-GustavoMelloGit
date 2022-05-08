import styled from 'styled-components';
import { Box, Container } from '@mui/material';

export const HomeContentWrapper = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const HomeFormGrid = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
`;

export const HomeContainer = styled(Container)`
  height: 100%;
`;
