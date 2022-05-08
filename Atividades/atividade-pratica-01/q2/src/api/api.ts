import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.apilayer.com/fixer',
  headers: {
    apiKey: 'otRRaUPhkUNGPeyAra2PrD7LidiL1qaP',
  },
});

export default api;
