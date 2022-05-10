import React, { useEffect, useState } from 'react';
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
  HomeContentContainer,
  HomeContainer,
  HomeFormHeader,
  HomeTotalTransactionValues,
  HomeToolbar,
  HomeTableHead,
} from './styles';
import HomeFormComponent from './components/Form';
import {
  BanksInterface,
  HomeFormValues,
  TransactionsInterface,
} from './interfaces';
import { convertToBRL, formatDate } from '../../shared/utils/functions';
import api from '../../api';

const HomePage: React.FC = () => {
  const [transactions, setTransactions] = useState({
    currentBalance: 0,
    transactions: [],
  } as TransactionsInterface);
  const [banksData, setBanksData] = useState([] as BanksInterface[]);

  const getBanksData = async () => {
    try {
      const response = await api.get('/banks/v1');
      setBanksData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

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
        transactions: [...prev.transactions, values],
      };
    });
  };

  const getBankName = (bankCode: string) => {
    const bank = banksData.find((bank) => bank.code === +bankCode);
    return bank ? bank.name : '';
  };

  useEffect(() => {
    getBanksData();
    return () => {
      setBanksData([]);
    };
  }, []);

  return (
    <HomeContainer>
      <HomeToolbar>
        <Typography variant='h2' component='h1'>
          Controle de pix
        </Typography>
      </HomeToolbar>
      <HomeContentContainer>
        <Box component={Card} p={2} variant='outlined'>
          <HomeCardContent>
            <HomeFormHeader>
              <Typography variant='h5' component='h2'>
                Digite as informações da transferência
              </Typography>
            </HomeFormHeader>
            <HomeFormComponent
              banksData={banksData}
              onSubmit={handleFormSubmit}
            />
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
              <HomeTableHead>
                <TableRow>
                  <TableCell>Chave</TableCell>
                  <TableCell>Banco</TableCell>
                  <TableCell align='center'>Valor</TableCell>
                  <TableCell align='center'>Data</TableCell>
                </TableRow>
              </HomeTableHead>
              <TableBody>
                {transactions?.transactions?.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.keyValue}</TableCell>
                    <TableCell>{getBankName(transaction.bank)}</TableCell>
                    <TableCell align='center'>
                      {convertToBRL(transaction.value)}
                    </TableCell>
                    <TableCell align='center'>
                      {formatDate(transaction.date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        )}
      </HomeContentContainer>
    </HomeContainer>
  );
};
export default HomePage;
