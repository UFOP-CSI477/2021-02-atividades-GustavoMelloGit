import React, { useState } from 'react';
import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { HomeCardContent, HomeContainer } from './styles';
import HomeFormComponent from './components/Form';
import { HomeFormValues, TransactionsInterface } from './interfaces';

const HomePage: React.FC = () => {
  const [transactions, setTransactions] = useState({
    currentBalance: 0,
  } as TransactionsInterface);

  const calculateBalance = (
    value: number,
    transactionType: 'send' | 'receive'
  ) => {
    const balance = transactions.currentBalance;
    if (transactionType === 'receive') {
      return balance + value;
    } else {
      return balance - value;
    }
  };

  const handleFormSubmit = (values: HomeFormValues) => {
    setTransactions((prev) => {
      return {
        currentBalance: calculateBalance(values.value, values.operationType),
        transactions:
          prev?.transactions?.length > 0
            ? [...prev.transactions, values]
            : [values],
      };
    });
  };

  return (
    <HomeContainer>
      <Typography variant='h2' component='h1'>
        Controle de pix
      </Typography>
      <Box component={Card} p={2} variant='outlined'>
        <HomeCardContent>
          <Typography variant='h5' component='h2'>
            Digite as informações da transferência
          </Typography>
          <HomeFormComponent onSubmit={handleFormSubmit} />
        </HomeCardContent>
      </Box>
    </HomeContainer>
  );
};
export default HomePage;
