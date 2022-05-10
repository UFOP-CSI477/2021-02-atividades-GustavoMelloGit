import { Card, Container, TableHead, Toolbar } from '@mui/material';
import { Box, styled } from '@mui/system';
import theme from '../../styles/theme';

const toolBarHeight = '100px';

export const HomeContentContainer = styled(Container)`
  min-height: calc(100% - ${toolBarHeight});
  display: flex;
  flex-direction: column;
  justify-content: center;
  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const HomeContainer = styled(Box)`
  height: 100%;
`;

export const HomeCardContent = styled(Box)`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const HomeFormHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HomeTotalTransactionValues = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const HomeToolbar = styled(Toolbar)`
  height: ${toolBarHeight};
  max-height: 100px;
  background-color: ${theme.blue[700]};
  color: #fff;
`;

export const HomeTableHead = styled(TableHead)`
  background-color: #cecece;
  border-radius: 4px;
  th:first-of-type {
    border-radius: 10px 0 0 0px;
  }
  th:last-child {
    border-radius: 0 10px 0px 0;
  }
`;
