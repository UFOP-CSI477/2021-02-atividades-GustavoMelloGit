import React, { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  HomeCardContent,
  HomeContainer,
  HomeFormHeader,
  HomeTotalTransactionValues,
} from './styles';
import HomeFormComponent from './components/Form';
import { HomeFormValues, TransactionsInterface } from './interfaces';
import { convertToBRL } from '../../shared/utils/functions';

const HomePage: React.FC = () => {
  const [transactions, setTransactions] = useState({
    currentBalance: 0,
  } as TransactionsInterface);

  const getAmountFromTransactionType = (
    transactionType: 'send' | 'receive'
  ) => {
    const amount = transactions.transactions.filter(
      (transaction) => transaction.operationType === transactionType
    );
    return amount.reduce((acc, curr) => acc + curr.value, 0);
  };

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
          <HomeFormHeader>
            <Typography variant='h5' component='h2'>
              Digite as informações da transferência
            </Typography>
          </HomeFormHeader>
          <HomeFormComponent onSubmit={handleFormSubmit} />
        </HomeCardContent>
      </Box>
      {transactions?.transactions?.length > 0 && (
        <React.Fragment>
          <HomeTotalTransactionValues variant='outlined'>
            <Typography variant='h6' component='span'>
              Valor total enviado:{' '}
              {convertToBRL(getAmountFromTransactionType('send'))}
            </Typography>
            <Typography variant='h6' component='span'>
              Valor total recebido:{' '}
              {convertToBRL(getAmountFromTransactionType('receive'))}
            </Typography>
            <Typography variant='h6' component='h2'>
              Saldo atual: {convertToBRL(transactions.currentBalance)}
            </Typography>
          </HomeTotalTransactionValues>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Chave</TableCell>
                <TableCell align='center'>Valor</TableCell>
                <TableCell align='center'>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.transactions?.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.keyValue}</TableCell>
                  <TableCell align='center'>
                    {convertToBRL(transaction.value)}
                  </TableCell>
                  <TableCell align='center'>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      )}
    </HomeContainer>
  );
};
export default HomePage;
