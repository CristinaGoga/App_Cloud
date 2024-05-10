import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const colors = {
  positive: '#6eff6e',
  negative: '#ff6384',
};

const API_KEY = 'X5T7KF8NZDJ6I895'; 

function StocksCard({ symbol }) {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
        );
        const data = response.data;
        setStockData(data);
      } catch (error) {
        console.error('Failed to fetch stock data', error);
        setStockData(null);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (!stockData) {
    return <LoadingMessage>Loading stock data...</LoadingMessage>;
  }

  const {
    Name,
    Symbol,
    Description,
    Exchange,
    Currency,
    Country,
    Sector,
    Industry,
    MarketCapitalization,
    PERatio,
    PriceToSalesRatioTTM,
    DividendYield,
    Price,
    Change,
  } = stockData;

  const price = parseFloat(Price);
  const change = parseFloat(Change);
  const priceColor = change >= 0 ? colors.positive : colors.negative;
  const changePercentage = ((change / price) * 100).toFixed(2);

  return (
    <CardWrapper>
      <StockHeader>{Name} ({Symbol})</StockHeader>
      <StockInfo>
        <InfoLabel>Exchange:</InfoLabel>
        <InfoValue>{Exchange}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Currency:</InfoLabel>
        <InfoValue>{Currency}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Country:</InfoLabel>
        <InfoValue>{Country}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Sector:</InfoLabel>
        <InfoValue>{Sector}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Industry:</InfoLabel>
        <InfoValue>{Industry}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Description:</InfoLabel>
        <InfoValue>{Description}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Market Cap:</InfoLabel>
        <InfoValue>{MarketCapitalization}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>P/E Ratio:</InfoLabel>
        <InfoValue>{PERatio}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>P/S Ratio:</InfoLabel>
        <InfoValue>{PriceToSalesRatioTTM}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Dividend Yield:</InfoLabel>
        <InfoValue>{DividendYield}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Price:</InfoLabel>
        <InfoValue style={{ color: priceColor }}>{price}</InfoValue>
      </StockInfo>
      <StockInfo>
        <InfoLabel>Change:</InfoLabel>
        <InfoValue style={{ color: priceColor }}>
          {change} ({changePercentage}%)
        </InfoValue>
      </StockInfo>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const StockHeader = styled.h3`
  color: #424242;
  font-size: 1.4rem;
  margin-bottom: 8px;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
  color: #555;
`;

const InfoValue = styled.span`
  color: #222;
`;

const LoadingMessage = styled.p`
  color: #777;
  text-align: center;
`;

export default StocksCard;
