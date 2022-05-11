import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.apilayer.com/fixer',
  headers: {
    apiKey: '7NJBIUsxRCnB1OEqaiNOngpwKzi122lX',
  },
});

export default api;
