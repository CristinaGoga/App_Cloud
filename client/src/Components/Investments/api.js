import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const STOCK_API_BASE_URL = 'https://api.example.com'; // Replace this with your stock API base URL
const REAL_ESTATE_API_BASE_URL = 'https://api.example.com'; // Replace this with your real estate API base URL

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    return [];
  }
};

export const fetchStocksData = async (symbol) => {
  const API_KEY = 'X5T7KF8NZDJ6I895'; // Replace with your actual API key
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`);
    const data = response.data;
    return {
      name: data.Name,
      price: data.Price, // Modificare aici
      change: data.ChangesPercentage, // Modificare aici
      pe_ratio: data.PERatio,
      eps: data.EPS,
      ps_ratio: data.PriceToSalesRatioTTM,
      dividend_yield: data.DividendYield,
    };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return {};
  }
};

export const fetchRealEstateData = async () => {
  try {
    const response = await axios.get(`${REAL_ESTATE_API_BASE_URL}/your-endpoint`); // Replace 'your-endpoint' with your actual endpoint
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    return [];
  }
};