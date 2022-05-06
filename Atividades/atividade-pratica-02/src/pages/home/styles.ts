import styled from 'styled-components';
import { Box } from '@mui/material';

export const HomeContentWrapper = styled(Box)`
  padding-top: 5rem;
`;

export const HomeFormGrid = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
`;
