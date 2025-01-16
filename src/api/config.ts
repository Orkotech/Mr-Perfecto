export const API_CONFIG = {
  baseUrl: import.meta.env.PROD 
    ? 'https://api.mrperfecto.com' 
    : 'http://localhost:3000',
  endpoints: {
    productSearch: '/api/products/search',
    retailers: {
      amazon: '/api/retailers/amazon',
      etsy: '/api/retailers/etsy'
    }
  },
  cache: {
    duration: 1000 * 60 * 60 // 1 hour
  }
};