import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brasilapi.com.br/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
