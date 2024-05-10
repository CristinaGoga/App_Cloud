import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3'; // URL-ul de bază pentru CoinGecko API

// Funcția pentru a obține datele pentru toate criptomonedele
export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets?vs_currency=usd`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch crypto data', error);
    return [];
  }
};

// Funcția pentru a obține datele istorice ale prețului pentru o anumită criptomonedă
export const fetchCryptoHistoricalData = async (coinId) => {
  try {
    const response = await axios.get(`${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=30`);
    return response.data.prices.map(price => price[1]); // Returnăm doar prețurile, fără timestamp-uri
  } catch (error) {
    console.error(`Failed to fetch historical data for coin ${coinId}`, error);
    return [];
  }
};
