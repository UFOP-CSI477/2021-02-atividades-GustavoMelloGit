import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { HomeContentWrapper, HomeFormGrid } from './styles';
import CardComponent from '../../components/Card';
import CurrencyInput from '../../components/CurrencyInput';
import { CurrenciesInterface } from './interfaces';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import api from '../../api/api';

const HomePage: React.FC = () => {
  const [currencyInput, setCurrencyInput] = useState('');
  const [currencies, setCurrencies] = useState([] as CurrenciesInterface[]);

  const fetchCurrencies = async () => {
    try {
      const response = await api.get('$top=10');
      setCurrencies(response.data.value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCurrencies();
    return () => {
      setCurrencies([]);
    };
  }, []);

  return (
    <Container>
      <HomeContentWrapper>
        <CardComponent>
          <Typography variant='h2' component='h1'>
            Conversor de moedas
          </Typography>
          <HomeFormGrid>
            <CurrencyInput
              fieldValue={currencyInput}
              setFieldValue={setCurrencyInput}
            />
            <TextField label='Converter de' fullWidth name='convertFrom' select>
              {currencies?.map((currency) => (
                <MenuItem key={currency.simbolo} value={currency.simbolo}>
                  {currency.nomeFormatado} ({currency.simbolo})
                </MenuItem>
              ))}
            </TextField>
            <Button variant='contained'>
              <CurrencyExchangeIcon />
            </Button>
            <TextField label='Para' fullWidth name='convertTo' select>
              {currencies?.map((currency) => (
                <MenuItem key={currency.simbolo} value={currency.simbolo}>
                  {currency.nomeFormatado} ({currency.simbolo})
                </MenuItem>
              ))}
            </TextField>
          </HomeFormGrid>
        </CardComponent>
      </HomeContentWrapper>
    </Container>
  );
};
export default HomePage;
