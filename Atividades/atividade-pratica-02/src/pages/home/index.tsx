import React, { useCallback, useEffect, useState } from 'react';
import { Button, MenuItem, Typography } from '@mui/material';
import { HomeContainer, HomeContentWrapper, HomeFormGrid } from './styles';
import CardComponent from '../../components/Card';
import CurrencyInput from '../../components/CurrencyInput';
import { CurrenciesInterface } from './interfaces';
import api from '../../api/api';
import SelectCurrency from './components/SelectCurrency';
import { convertToBRL } from '../../utils/functions';

const HomePage: React.FC = () => {
  const [currencyInput, setCurrencyInput] = useState('');
  const [currencies, setCurrencies] = useState([] as CurrenciesInterface[]);
  const [isLoading, setIsLoading] = useState(false);
  const [convertFrom, setConvertFrom] = useState('');
  const [convertTo, setConvertTo] = useState('');
  const [exchangeResult, setExchangeResult] = useState(0);

  const handleExchangeCurrency = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/convert?to=${convertTo}&from=${convertFrom}&amount=${currencyInput}`
      );
      setExchangeResult(response.data.result);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, [convertFrom, convertTo, currencyInput]);

  const fetchCurrencies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/symbols');
      setCurrencies(
        Object.keys(response.data.symbols).map((key) => ({
          [key]: response.data.symbols[key],
        }))
      );
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, []);

  const getSelectOptions = () => {
    return currencies?.map((currency) => {
      const symbol = Object.keys(currency)[0];
      return (
        <MenuItem key={symbol} value={symbol}>
          {currency[symbol]} ({symbol})
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    fetchCurrencies();
    return () => {
      setCurrencies([]);
    };
  }, [fetchCurrencies]);

  return (
    <HomeContainer>
      <HomeContentWrapper>
        <CardComponent>
          <Typography variant='h2' component='h1'>
            Conversor de moedas
          </Typography>
          <HomeFormGrid>
            <CurrencyInput
              fieldValue={currencyInput}
              setFieldValue={setCurrencyInput}
              label='Valor'
            />
            <SelectCurrency
              label='Converter de'
              options={getSelectOptions()}
              setValue={setConvertFrom}
              value={convertFrom}
              isLoading={isLoading}
            />
            <SelectCurrency
              label='Para'
              options={getSelectOptions()}
              setValue={setConvertTo}
              value={convertTo}
              isLoading={isLoading}
            />
            <Button variant='contained' onClick={handleExchangeCurrency}>
              Converter
            </Button>
          </HomeFormGrid>
        </CardComponent>
        <CardComponent>
          <Typography variant='h2' component='h1'>
            Resultado
          </Typography>
          <Typography variant='h4' component='h2'>
            {convertToBRL(exchangeResult)}
          </Typography>
        </CardComponent>
      </HomeContentWrapper>
    </HomeContainer>
  );
};
export default HomePage;
